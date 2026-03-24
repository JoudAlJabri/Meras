export const mockUsers = [
  {
    id: 1,
    name: 'Sara Mohammed',
    email: 'sara@gmail.com',
    password: '123456',
    role: 'explorer',
    joinDate: '2026-03-10',
    status: 'Active',
    recommendedMajors: ['Computer Science', 'Software Engineering', 'Data Science']
  },
  {
    id: 2,
    name: 'Rana Abdullah',
    email: 'rana@kfupm.edu.sa',
    password: '123456',
    role: 'guide',
    major: 'Software Engineering',
    university: 'KFUPM',
    isVerified: true,
    joinDate: '2026-03-12',     
    status: 'Active'   
  },
  {
    id: 3,
    name: 'Dana Alsawad',
    email: 'admin@meras.com',
    password: 'admin123',
    role: 'admin' ,
   joinDate: '2026-03-01',     
    status: 'Active'  
  }
]

export const mockChallenges = [
  {
    id: 1,
    title: 'Build a Simple Calculator',
    major: 'Computer Science',
    difficulty: 'Beginner',
    estimatedTime: '30 mins',
    mentorName: 'Rana Abdullah',
    mentorId: 2,
    description: 'Write a simple program that adds two numbers.',
    instructions: 'Create a calculator that handles addition, subtraction, multiplication and division.'
  },
  {
    id: 2,
    title: 'Sketch a Floor Plan',
    major: 'Architecture',
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    mentorName: 'Khalid Hassan',
    mentorId: 4,
    description: 'Design a basic room layout using graph paper or any tool.',
    instructions: 'Sketch a 3-bedroom apartment floor plan with labeled rooms.'
  },
  {
    id: 3,
    title: 'Analyze a Business Case',
    major: 'Business Administration',
    difficulty: 'Intermediate',
    estimatedTime: '1 hour',
    mentorName: 'Noura Salem',
    mentorId: 5,
    description: 'Read a short business scenario and identify problems.',
    instructions: 'Read the attached PDF and write a 200-word analysis.'
  }
]

export const mockMentors = [
  {
    id: 2,
    name: 'Rana Abdullah',
    major: 'Software Engineering',
    university: 'KFUPM',
    rating: 4.8,
    totalSessions: 23,
    bio: 'Senior SWE student. Love helping high schoolers discover coding!',
    isVerified: true,
    hourlyRate: 50
  },
  {
    id: 4,
    name: 'Khalid Hassan',
    major: 'Architecture',
    university: 'KAU',
    rating: 4.5,
    totalSessions: 15,
    bio: 'Architecture student with a passion for design.',
    isVerified: true,
    hourlyRate: 45
  }


]

const UNIVERSITIES = [
  'King Fahd University of Petroleum and Minerals (KFUPM)',
  'King Abdulaziz University (KAU)',
  'King Saud University (KSU)',
  'King Abdullah University of Science and Technology (KAUST)',
  'Princess Nourah bint Abdulrahman University (PNU)',
  'Imam Abdulrahman Bin Faisal University (IAU)',
  'Taibah University',
  'Taif University',
  'Qassim University',
  'Umm Al-Qura University',
  'Other'
]

const MAJORS = [
  'Software Engineering',
  'Computer Science',
  'Information Technology',
  'Data Science',
  'Cybersecurity',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Architecture',
  'Business Administration',
  'Finance',
  'Accounting',
  'Marketing',
  'Medicine',
  'Pharmacy',
  'Nursing',
  'Law',
  'Education',
  'Psychology',
  'Graphic Design',
  'Other'
]
export const mockPendingApplications = [
  {
    id: 2,
    name: 'Reem Abdullah',
    email: 'reem@kfupm.edu.sa',
    university: 'KFUPM',
    major: 'Software Engineering',
    submittedDate: '2026-03-15',
    documentPreview: 'Guide verification document preview goes here.',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Noura Salem',
    email: 'noura@example.com',
    university: 'KFUPM',
    major: 'Chemical Engineering',
    submittedDate: '2026-03-17',
    documentPreview: 'Transcript / ID / proof of enrollment preview.',
    status: 'Pending',
  },
]