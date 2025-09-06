
-- Training System Database Schema

-- Training Programs
CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_weeks INTEGER,
  price_cents INTEGER,
  is_active BOOLEAN DEFAULT true,
  certification_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Training Modules
CREATE TABLE training_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES training_programs(id),
  module_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  learning_objectives TEXT[],
  estimated_hours INTEGER,
  is_required BOOLEAN DEFAULT true,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Module Lessons
CREATE TABLE module_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES training_modules(id),
  lesson_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'video', 'text', 'interactive', 'document'
  content_url VARCHAR(500),
  text_content TEXT,
  duration_minutes INTEGER,
  order_index INTEGER,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Assessments
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES training_modules(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assessment_type VARCHAR(50), -- 'quiz', 'exam', 'practical', 'assignment'
  passing_score INTEGER DEFAULT 80,
  time_limit_minutes INTEGER,
  max_attempts INTEGER DEFAULT 3,
  is_final_exam BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Assessment Questions
CREATE TABLE assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES assessments(id),
  question_number INTEGER,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50), -- 'multiple_choice', 'true_false', 'short_answer', 'essay'
  correct_answer TEXT,
  answer_options JSONB, -- For multiple choice questions
  points INTEGER DEFAULT 1,
  explanation TEXT,
  irs_reference VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Student Enrollments
CREATE TABLE student_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  program_id UUID REFERENCES training_programs(id),
  enrollment_date TIMESTAMP DEFAULT NOW(),
  completion_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'dropped', 'suspended'
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  certificate_issued BOOLEAN DEFAULT false,
  certificate_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Student Progress
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES student_enrollments(id),
  module_id UUID REFERENCES training_modules(id),
  lesson_id UUID REFERENCES module_lessons(id),
  completion_status VARCHAR(50) DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  completion_date TIMESTAMP,
  time_spent_minutes INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Assessment Attempts
CREATE TABLE assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES student_enrollments(id),
  assessment_id UUID REFERENCES assessments(id),
  attempt_number INTEGER,
  score DECIMAL(5,2),
  max_score INTEGER,
  passed BOOLEAN,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  answers JSONB,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES student_enrollments(id),
  certificate_type VARCHAR(100),
  certificate_number VARCHAR(100) UNIQUE,
  issued_date TIMESTAMP DEFAULT NOW(),
  expiry_date TIMESTAMP,
  verification_code VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- IRS PTIN Tracking
CREATE TABLE ptin_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  ptin_number VARCHAR(50),
  application_date TIMESTAMP,
  status VARCHAR(50), -- 'pending', 'approved', 'denied', 'expired'
  expiry_date TIMESTAMP,
  renewal_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_student_enrollments_user_id ON student_enrollments(user_id);
CREATE INDEX idx_student_progress_enrollment_id ON student_progress(enrollment_id);
CREATE INDEX idx_assessment_attempts_enrollment_id ON assessment_attempts(enrollment_id);
CREATE INDEX idx_training_modules_program_id ON training_modules(program_id);
CREATE INDEX idx_module_lessons_module_id ON module_lessons(module_id);
CREATE INDEX idx_assessments_module_id ON assessments(module_id);
