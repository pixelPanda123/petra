-- ENUM Types
CREATE TYPE time_period AS ENUM ('monthly', 'weekly', 'yearly', 'custom');
CREATE TYPE progress_status AS ENUM ('current', 'archived');
CREATE TYPE user_role AS ENUM ('student', 'coach', 'head_coach', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'archived');
CREATE TYPE student_status AS ENUM ('active', 'inactive', 'transferred', 'graduated');
CREATE TYPE attendance_action AS ENUM ('punch_in', 'punch_out');
CREATE TYPE payment_status AS ENUM ('paid', 'unpaid', 'partial');
CREATE TYPE session_type AS ENUM ('morning', 'evening', 'weekend');
CREATE TYPE session_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE enrollment_status AS ENUM ('active', 'inactive', 'withdrawn');
CREATE TYPE age_group AS ENUM ('Under-10', 'Under-13', 'Under-15', 'Under-17', 'Mixed');

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $
BEGIN
    -- This would be called from application level to log admin actions
    -- Implementation depends on application context
    RETURN COALESCE(NEW, OLD);
END;
$ LANGUAGE plpgsql;

-- ==========================================
-- ESSENTIAL INDEXES ONLY
-- ==========================================

-- Authentication & User Management (Critical)
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- High-Volume Operations (Attendance System)
CREATE INDEX idx_attendance_student_date ON attendance_records(student_id, attendance_date);
CREATE INDEX idx_attendance_unpunched ON attendance_records(student_id, session_id) WHERE punch_out_time IS NULL;

-- Progress Tracking (Core Business Logic)
CREATE INDEX idx_progress_student_date ON progress(student_id, date);
CREATE INDEX idx_progress_current ON progress(student_id, status) WHERE status = 'current';

-- Fee Management (Financial Operations)
CREATE INDEX idx_fee_records_student_status ON fee_records(student_id, payment_status);
CREATE INDEX idx_fee_records_overdue ON fee_records(due_date, payment_status) WHERE payment_status != 'paid' AND due_date < NOW();

-- Session Management (Daily Operations)
CREATE INDEX idx_session_enrollments_active ON session_enrollments(student_id, session_id) WHERE status = 'active';
CREATE INDEX idx_sessions_facility_active ON sessions(facility_id, status) WHERE status = 'scheduled';

-- Student Management (Frequent Lookups)
CREATE INDEX idx_students_facility_active ON students(primary_facility_id, status) WHERE status = 'active';

-- USERS Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    status user_status DEFAULT 'active',
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- FACILITIES Table (Updated based on Petra Sports Academy)
CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- STUDENTS Table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    student_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    primary_facility_id INT REFERENCES facilities(id),
    enrollment_date DATE NOT NULL,
    date_of_birth DATE,
    age_group age_group,
    status student_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- EMERGENCY CONTACTS Table (Replaced JSONB)
CREATE TABLE emergency_contacts (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    contact_name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50),
    phone_number VARCHAR(15),
    email VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE
);

-- MEDICAL INFO Table (Replaced JSONB)
CREATE TABLE medical_info (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    condition_name VARCHAR(100),
    description TEXT,
    medication TEXT,
    allergies TEXT,
    doctor_contact VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- POSITIONS Table
CREATE TABLE positions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- CRITERIA Table
CREATE TABLE criteria (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Technical', 'Tactical', 'Physical', 'Psychological')),
    name VARCHAR(100) NOT NULL,
    UNIQUE (category, name)
);

-- SCORING SYSTEMS Table (New table to define the two evaluation systems)
CREATE TABLE scoring_systems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Insert the two scoring systems
INSERT INTO scoring_systems (name, description) VALUES
('In-field Player', 'Evaluation criteria for all outfield positions including defenders, midfielders, and forwards'),
('Goalkeeper', 'Specialized evaluation criteria for goalkeepers');

-- Update CRITERIA table to link to scoring systems instead of just categories
ALTER TABLE criteria ADD COLUMN scoring_system_id INT REFERENCES scoring_systems(id);

-- POSITION-SCORING SYSTEM Mapping Table (replaces position_criteria)
CREATE TABLE position_scoring_systems (
    id SERIAL PRIMARY KEY,
    position_id INT REFERENCES positions(id) ON DELETE CASCADE,
    scoring_system_id INT REFERENCES scoring_systems(id) ON DELETE CASCADE
);

-- Drop the old position_criteria table
DROP TABLE position_criteria;

-- SCORES Table
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);

-- SCORE DETAILS Table
CREATE TABLE score_details (
    id SERIAL PRIMARY KEY,
    scores_id INT REFERENCES scores(id) ON DELETE CASCADE,
    criteria_id INT REFERENCES criteria(id) ON DELETE CASCADE,
    score NUMERIC(5,2) CHECK (score >= 0 AND score <= 10),
    comment TEXT,
    weight NUMERIC(4,2)
);

-- COACHES Table (Updated with phone numbers array)
CREATE TABLE coaches (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    coach_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    phone_numbers TEXT[], -- Array of phone numbers
    status user_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- COACH CERTIFICATIONS Table (Replaced JSONB)
CREATE TABLE coach_certifications (
    id SERIAL PRIMARY KEY,
    coach_id INT REFERENCES coaches(id) ON DELETE CASCADE,
    certification_name VARCHAR(100) NOT NULL,
    issuing_body VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    certificate_number VARCHAR(100)
);

-- PROGRESS Table
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time_period time_period NOT NULL,
    coach_id INT REFERENCES coaches(id) ON DELETE SET NULL,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    position_id INT REFERENCES positions(id) ON DELETE SET NULL,
    scores_id INT REFERENCES scores(id) ON DELETE CASCADE,
    status progress_status DEFAULT 'current'
);

-- SESSIONS Table (Updated based on Petra Sports Academy schedule)
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    facility_id INT REFERENCES facilities(id),
    coach_id INT REFERENCES coaches(id),
    session_type session_type NOT NULL,
    batch_name VARCHAR(100),
    age_group age_group,
    start_time TIME,
    end_time TIME,
    days_of_week TEXT[], -- Array like ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    status session_status DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT NOW()
);

-- SESSION ENROLLMENTS Table
CREATE TABLE session_enrollments (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    session_id INT REFERENCES sessions(id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL,
    status enrollment_status DEFAULT 'active'
);

-- ATTENDANCE RECORDS Table (Updated for punch in/out system)
CREATE TABLE attendance_records (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    session_id INT REFERENCES sessions(id),
    attendance_date DATE NOT NULL,
    punch_in_time TIMESTAMP,
    punch_out_time TIMESTAMP,
    duration_minutes INT, -- Calculated field
    is_auto_punch_out BOOLEAN DEFAULT FALSE, -- True if system auto-punched out
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ATTENDANCE ACTIONS Table (Log each punch in/out action)
CREATE TABLE attendance_actions (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    session_id INT REFERENCES sessions(id),
    action_type attendance_action NOT NULL,
    action_time TIMESTAMP DEFAULT NOW(),
    device_info VARCHAR(100), -- iPad identifier or location
    ip_address INET
);

-- FEE STRUCTURES Table
CREATE TABLE fee_structures (
    id SERIAL PRIMARY KEY,
    facility_id INT REFERENCES facilities(id),
    plan_name VARCHAR(100),
    monthly_fee DECIMAL(10,2),
    registration_fee DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ADDITIONAL CHARGES Table (Replaced JSONB)
CREATE TABLE additional_charges (
    id SERIAL PRIMARY KEY,
    fee_structure_id INT REFERENCES fee_structures(id) ON DELETE CASCADE,
    charge_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT
);

-- FEE RECORDS Table
CREATE TABLE fee_records (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    fee_structure_id INT REFERENCES fee_structures(id),
    amount_due DECIMAL(10,2),
    amount_paid DECIMAL(10,2),
    due_date DATE,
    paid_date DATE,
    payment_status payment_status DEFAULT 'unpaid',
    payment_method VARCHAR(100),
    notes TEXT,
    recorded_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- AUTO PUNCH OUT SETTINGS Table
CREATE TABLE auto_punch_out_settings (
    id SERIAL PRIMARY KEY,
    facility_id INT REFERENCES facilities(id),
    session_id INT REFERENCES sessions(id),
    auto_punch_out_minutes INT DEFAULT 30, -- Auto punch out after 30 minutes of session end
    is_enabled BOOLEAN DEFAULT TRUE
);

-- Insert default facilities based on Petra Sports Academy
INSERT INTO facilities (name, code, address, city, state) VALUES
('Stadium of Hope', 'SOH', 'Khanapur', 'Hyderabad', 'Telangana'),
('Petra Sports Academy', 'PSA_AZ', 'Aziz Nagar', 'Hyderabad', 'Telangana'),
('Petra Sports Academy', 'PSA_TP', 'Tellapur', 'Hyderabad', 'Telangana');

-- Insert traditional football positions
INSERT INTO positions (name) VALUES
-- Goalkeepers
('Goalkeeper'),
-- Defenders
('Center Back'),
('Left Back'),
('Right Back'),
('Sweeper'),
-- Midfielders
('Defensive Midfielder'),
('Central Midfielder'),
('Attacking Midfielder'),
('Left Midfielder'),
('Right Midfielder'),
('Left Wing'),
('Right Wing'),
-- Forwards
('Striker'),
('Center Forward'),
('Left Forward'),
('Right Forward'),
('False 9'),
('Second Striker');

-- Insert criteria with scoring system references
INSERT INTO criteria (category, name, scoring_system_id) VALUES
-- Technical criteria for In-field Players
('Technical', 'Dribbling', 1),
('Technical', 'Receiving', 1),
('Technical', 'Passing', 1),
('Technical', 'Ball Control', 1),
('Technical', 'Turning with the ball', 1),
('Technical', '1v1 Attacking', 1),
('Technical', '1v1 Defending', 1),
('Technical', 'Crossing and Finishing', 1),
('Technical', 'Shooting', 1),
('Technical', 'Heading', 1),

-- Technical criteria for Goalkeepers
('Technical', 'Shot Stopping', 2),
('Technical', 'Diving', 2),
('Technical', 'Ball Handling', 2),
('Technical', 'Distribution', 2),
('Technical', 'Breakaway (1v1)', 2),
('Technical', 'Dealing with Crosses', 2),

-- Tactical criteria for In-field Players
('Tactical', 'Positioning', 1),
('Tactical', 'Offensive Behavior', 1),
('Tactical', 'Decision Making', 1),
('Tactical', 'Transition AD & DA', 1),
('Tactical', 'Defensive Behavior', 1),
('Tactical', 'Off the ball movement', 1),

-- Tactical criteria for Goalkeepers
('Tactical', 'Decision Making', 2),
('Tactical', 'Off the ball movement', 2),
('Tactical', 'Positioning and Angles', 2),
('Tactical', 'Transition', 2),
('Tactical', 'Set pieces (Defensive)', 2),

-- Physical criteria (same for both systems)
('Physical', 'Agility', 1),
('Physical', 'Reaction Time', 1),
('Physical', 'Endurance', 1),
('Physical', 'Footwork', 1),
('Physical', 'Balance & Coordination', 1),
('Physical', 'Strength', 1),

('Physical', 'Agility', 2),
('Physical', 'Reaction Time', 2),
('Physical', 'Footwork', 2),
('Physical', 'Strength', 2),
('Physical', 'Endurance', 2),
('Physical', 'Balance & Coordination', 2),

-- Psychological criteria (same for both systems)
('Psychological', 'Confidence', 1),
('Psychological', 'Discipline', 1),
('Psychological', 'Concentration', 1),
('Psychological', 'Competitiveness', 1),
('Psychological', 'Communication', 1),
('Psychological', 'Leadership', 1),
('Psychological', 'Creativity', 1),
('Psychological', 'Resilience', 1),

('Psychological', 'Confidence', 2),
('Psychological', 'Competitiveness', 2),
('Psychological', 'Discipline', 2),
('Psychological', 'Concentration', 2),
('Psychological', 'Communication', 2),
('Psychological', 'Leadership', 2),
('Psychological', 'Creativity', 2),
('Psychological', 'Resilience', 2);

-- Map all outfield positions to In-field Player scoring system
INSERT INTO position_scoring_systems (position_id, scoring_system_id)
SELECT p.id, 1 
FROM positions p 
WHERE p.name != 'Goalkeeper';

-- Map Goalkeeper position to Goalkeeper scoring system
INSERT INTO position_scoring_systems (position_id, scoring_system_id)
SELECT p.id, 2 
FROM positions p 
WHERE p.name = 'Goalkeeper';

-- Create function to auto punch out students
CREATE OR REPLACE FUNCTION auto_punch_out_students()
RETURNS void AS $$
DECLARE
    rec RECORD;
BEGIN
    -- Find students who haven't punched out and session ended + buffer time
    FOR rec IN 
        SELECT DISTINCT ar.student_id, ar.session_id, ar.id as attendance_id
        FROM attendance_records ar
        JOIN sessions s ON ar.session_id = s.id
        JOIN auto_punch_out_settings aps ON s.id = aps.session_id
        WHERE ar.punch_out_time IS NULL 
        AND ar.punch_in_time IS NOT NULL
        AND aps.is_enabled = TRUE
        AND NOW() > (DATE(ar.attendance_date) + s.end_time + INTERVAL '1 minute' * aps.auto_punch_out_minutes)
    LOOP
        -- Auto punch out the student
        UPDATE attendance_records 
        SET punch_out_time = NOW(),
            is_auto_punch_out = TRUE,
            notes = COALESCE(notes, '') || ' Auto-punched out by system'
        WHERE id = rec.attendance_id;
        
        -- Log the auto punch out action
        INSERT INTO attendance_actions (student_id, session_id, action_type, device_info)
        VALUES (rec.student_id, rec.session_id, 'punch_out', 'SYSTEM_AUTO');
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ADMIN Table
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    admin_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone_numbers TEXT[], -- Array of phone numbers
    department VARCHAR(100), -- IT, Operations, Management, etc.
    permissions TEXT[], -- Array of specific permissions
    status user_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- HEAD COACHES Table
CREATE TABLE head_coaches (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    head_coach_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone_numbers TEXT[], -- Array of phone numbers
    facility_id INT REFERENCES facilities(id), -- Head coach is responsible for a facility
    years_of_experience INT,
    specialization VARCHAR(100),
    status user_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- HEAD COACH CERTIFICATIONS Table
CREATE TABLE head_coach_certifications (
    id SERIAL PRIMARY KEY,
    head_coach_id INT REFERENCES head_coaches(id) ON DELETE CASCADE,
    certification_name VARCHAR(100) NOT NULL,
    issuing_body VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    certificate_number VARCHAR(100)
);

-- COACH ASSIGNMENTS Table (Head coaches assign coaches to sessions)
CREATE TABLE coach_assignments (
    id SERIAL PRIMARY KEY,
    head_coach_id INT REFERENCES head_coaches(id) ON DELETE CASCADE,
    coach_id INT REFERENCES coaches(id) ON DELETE CASCADE,
    session_id INT REFERENCES sessions(id) ON DELETE CASCADE,
    assigned_date DATE NOT NULL,
    status enrollment_status DEFAULT 'active',
    notes TEXT
);

-- PERFORMANCE REVIEWS Table (Head coaches review coach performance)
CREATE TABLE performance_reviews (
    id SERIAL PRIMARY KEY,
    head_coach_id INT REFERENCES head_coaches(id) ON DELETE SET NULL,
    coach_id INT REFERENCES coaches(id) ON DELETE CASCADE,
    review_date DATE NOT NULL,
    rating NUMERIC(3,2) CHECK (rating >= 1 AND rating <= 5), -- 1-5 scale
    strengths TEXT,
    areas_for_improvement TEXT,
    goals_set TEXT,
    overall_comments TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- SYSTEM LOGS Table (Admin activity tracking)
CREATE TABLE system_logs (
    id SERIAL PRIMARY KEY,
    admin_id INT REFERENCES admins(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', etc.
    table_name VARCHAR(100),
    record_id INT,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- USER PERMISSIONS Table (Granular permission control)
CREATE TABLE user_permissions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    permission_name VARCHAR(100) NOT NULL, -- 'view_reports', 'manage_fees', 'assign_coaches', etc.
    granted_by INT REFERENCES users(id),
    granted_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- FACILITY MANAGEMENT Table (Head coaches manage facility operations)
CREATE TABLE facility_management (
    id SERIAL PRIMARY KEY,
    facility_id INT REFERENCES facilities(id) ON DELETE CASCADE,
    head_coach_id INT REFERENCES head_coaches(id) ON DELETE SET NULL,
    assigned_date DATE NOT NULL,
    status enrollment_status DEFAULT 'active',
    responsibilities TEXT[]
);

-- Update SESSIONS table to include head coach approval
ALTER TABLE sessions ADD COLUMN head_coach_id INT REFERENCES head_coaches(id);
ALTER TABLE sessions ADD COLUMN approved_by_head_coach BOOLEAN DEFAULT FALSE;
ALTER TABLE sessions ADD COLUMN approval_date TIMESTAMP;

-- Update PROGRESS table to include head coach review
ALTER TABLE progress ADD COLUMN reviewed_by_head_coach INT REFERENCES head_coaches(id);
ALTER TABLE progress ADD COLUMN head_coach_comments TEXT;
ALTER TABLE progress ADD COLUMN review_date TIMESTAMP;

-- Create trigger to calculate duration when punch out occurs
CREATE OR REPLACE FUNCTION calculate_attendance_duration()
RETURNS TRIGGER AS $
BEGIN
    IF NEW.punch_out_time IS NOT NULL AND NEW.punch_in_time IS NOT NULL THEN
        NEW.duration_minutes := EXTRACT(EPOCH FROM (NEW.punch_out_time - NEW.punch_in_time)) / 60;
    END IF;
    RETURN NEW;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER attendance_duration_trigger
    BEFORE UPDATE ON attendance_records
    FOR EACH ROW
    EXECUTE FUNCTION calculate_attendance_duration();

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $
BEGIN
    -- This would be called from application level to log admin actions
    -- Implementation depends on application context
    RETURN COALESCE(NEW, OLD);
END;
$ LANGUAGE plpgsql;