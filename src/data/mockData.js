export const mockUsers = [
  {
    id: 1,
    name: 'Sara Mohammed',
    email: 'sara@gmail.com',
    password: '123456',
    role: 'explorer',
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
    isVerified: true
  },
  {
    id: 3,
    name: 'Admin',
    email: 'admin@meras.com',
    password: 'admin123',
    role: 'admin'
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
    title: "Design a Custom Gear Train",
    major: "Mechanical Engineering",
    description: "Using the provided formulas, calculate the required gear ratios to lift a 50kg weight using a standard 12V DC motor. Submit your calculations and a rough sketch of the gear sequence.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "30 mins",
    difficulty: "Medium"
  },
  {
    title: "Design a Smart Home Logic Circuit",
    major: "Electrical Engineering",
    description: "Draw a logic gate circuit (AND/OR/NOT) that turns on the garden sprinklers ONLY IF it is night time AND the soil moisture sensor reads dry.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "25 mins",
    difficulty: "Medium"
  },
    {
    title: "Scale Up a Chemical Reaction",
    major: "Chemical Engineering",
    description: "A lab-scale reaction produces 10g of product per hour. Calculate the required reactor volume and raw material feed rate to scale this up to an industrial 500kg/hour plant.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "40 mins",
    difficulty: "Hard"
  },
  {
    title: "Simulate a Projectile with Drag",
    major: "Physics",
    description: "Calculate the landing coordinates of a launched projectile, accounting for realistic atmospheric drag coefficients.",
    difficulty: "Advanced",
    timeEstimate: 60,
    tags: ["Investigative", "Realistic"],
    mentorId: "60d5ecb8b395d1...",
    mentorName: "Tariq Al-Nasser",
    instructions: "Standard physics problems ignore air resistance, but the real world doesn't. Use the provided Python script template and the initial velocity parameters (v0 = 50m/s, angle = 45 deg). Write a numerical integration loop (Euler's method) that calculates the x and y positions over time until the object hits the ground (y=0)."
  },
  {
    title: "Design a Custom CPU Instruction",
    major: "Computer Engineering",
    description: "Map out the datapath and control signals required to add a custom 'Multiply-Accumulate' (MAC) instruction to a basic 16-bit processor.",
    difficulty: "Advanced",
    timeEstimate: 90,
    tags: ["Investigative", "Realistic"],
    mentorId: "60d5ecb8b394d9...",
    mentorName: "Omar Khalid",
    instructions: "You are given the schematic of a basic single-cycle 16-bit"
  },
   {
    title: "Perform a Startup Valuation (DCF)",
    major: "Finance",
    description: "Use the provided Excel template to project a tech startup's cash flows for the next 5 years and calculate its present value to decide if you should invest.",
    tags: ["Enterprising", "Conventional", "Investigative"],
    timeEstimate: "40 mins",
    difficulty: "Hard"
  },
    {
    title: "Draft a Floor Plan for a Tiny Home",
    major: "Architecture",
    description: "Using a 200 sq. ft. constraint, sketch a functional floor plan that includes a sleeping area, kitchenette, and bathroom. Focus on spatial efficiency.",
    tags: ["Artistic", "Realistic"],
    timeEstimate: "40 mins",
    difficulty: "Hard"
  },
  {
    title: "Thermal Analysis of a Coffee Cup",
    major: "Mechanical Engineering",
    description: "Analyze the heat loss of a ceramic vs. insulated steel coffee mug over 30 minutes. Use the provided thermodynamics cheat sheet to estimate the temperature drop.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "20 mins",
    difficulty: "Easy"
  },
{
    title: "Analyze Artificial Blood Flow Dynamics",
    major: "Bio Engineering",
    description: "Calculate the pressure drop across a newly designed artificial heart valve using Bernoulli's equation and the provided fluid velocity data.",
    tags: ["Investigative", "Conventional"],
    timeEstimate: "30 mins",
    difficulty: "Hard"
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
  },
  // ⚙️ Mechanical Engineering
  
  
  // ⚡ Electrical Engineering
  {
    title: "Design a Smart Home Logic Circuit",
    major: "Electrical Engineering",
    description: "Draw a logic gate circuit (AND/OR/NOT) that turns on the garden sprinklers ONLY IF it is night time AND the soil moisture sensor reads dry.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "25 mins",
    difficulty: "Medium"
  },
  {
    title: "Debug a Verilog Traffic Controller",
    major: "Computer Engineering",
    description: "Find and fix the timing glitch in a hardware description script that is causing a traffic light to show green for both directions.",
    difficulty: "Advanced",
    timeEstimate: 60,
    tags: ["Investigative", "Conventional"],
    mentorId: "60d5ecb8b393d8...",
    mentorName: "Sara Al-Dosari",
    instructions: "The attached Verilog (.v) file simulates a 4-way intersection on an FPGA. During the state transition from State 2 to State 3, a race condition causes both lights to flash green for exactly 1 clock cycle. Trace the finite state machine logic, identify the missing default state or non-blocking assignment error, and submit the corrected code."
  },
  

  // 🧪 Chemical Engineering

  {
    title: "Design a Water Filtration Sequence",
    major: "Chemical Engineering",
    description: "Arrange the 5 provided separation techniques (e.g., reverse osmosis, carbon filter, UV light) in the correct order to turn river water into safe drinking water.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "20 mins",
    difficulty: "Medium"
  },

  // 🛢️ Petroleum Engineering
  {
    title: "Analyze Well Log Data",
    major: "Petroleum Engineering",
    description: "Examine the attached electrical resistivity and gamma-ray logs. Identify at which depth the porous sandstone reservoir (potential oil zone) begins and ends.",
    tags: ["Investigative", "Conventional"],
    timeEstimate: "35 mins",
    difficulty: "Hard"
  },
   {
    title: "Create a 30-Day Onboarding Plan",
    major: "Business Administration",
    description: "Employee turnover is high because new hires feel lost. Design a bulleted 30-day onboarding schedule for a new Marketing Manager to ensure they integrate smoothly.",
    tags: ["Social", "Enterprising"],
    timeEstimate: "30 mins",
    difficulty: "Medium"
  },

  // 🏗️ Civil Engineering
  {
    title: "Calculate Bridge Truss Load",
    major: "Civil Engineering",
    description: "Use the method of joints to calculate the tension and compression forces on the 3 main steel beams of the provided bridge diagram when a 2-ton truck crosses.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "45 mins",
    difficulty: "Hard"
  },
   {
    title: "Diversify a Client's Portfolio",
    major: "Finance",
    description: "A 60-year-old client wants a low-risk retirement portfolio. Reallocate their $100,000 across the provided list of stocks, bonds, and ETFs to match their risk profile.",
    tags: ["Enterprising", "Conventional"],
    timeEstimate: "20 mins",
    difficulty: "Medium"
  },
   
  

  // 🧬 Bio Engineering
  {
    title: "Design an Ergonomic Prosthetic Grip",
    major: "Bio Engineering",
    description: "Sketch a mechanism for a 3D-printed prosthetic hand that allows the user to hold a fragile egg without breaking it, utilizing the provided flex sensor constraints.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "35 mins",
    difficulty: "Medium"
  },
  
  {
    title: "Calculate Household Power Load",
    major: "Electrical Engineering",
    description: "Review the attached list of household appliances. Calculate the total amperage draw and determine if a standard 15-amp circuit breaker will trip if they all run at once.",
    tags: ["Investigative", "Conventional"],
    timeEstimate: "15 mins",
    difficulty: "Easy"
  },

  // 💻 Computer Science
  {
    title: "Debug a Python Sorting Algorithm",
    major: "Computer Science",
    description: "The attached Bubble Sort script is crashing on line 12. Find the logic error, fix the code, and submit the working file.",
    tags: ["Investigative", "Conventional"],
    timeEstimate: "20 mins",
    difficulty: "Easy"
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
    title: "Design a Database Schema",
    major: "Computer Science",
    description: "Draw an Entity-Relationship (ER) diagram for a University Library system. It must include tables for Books, Students, and Checkouts, with the correct primary/foreign keys.",
    tags: ["Investigative", "Conventional"],
    timeEstimate: "30 mins",
    difficulty: "Medium"
  },
  {
    title: "Calculate Safe Drilling Mud Weight",
    major: "Petroleum Engineering",
    description: "Using the provided formation pressure data at 10,000 feet, calculate the exact density of drilling fluid (mud) required to prevent a blowout without fracturing the rock.",
    tags: ["Investigative", "Realistic"],
    timeEstimate: "25 mins",
    difficulty: "Medium"
  },
 {
    title: "Design a Sustainable Intersection",
    major: "Civil Engineering",
    description: "Redesign the provided messy 4-way city intersection. Sketch a solution that incorporates a bike lane, safe pedestrian crossing, and optimizes traffic flow.",
    tags: ["Investigative", "Artistic"],
    timeEstimate: "30 mins",
    difficulty: "Medium"
  },

  // 📈 Finance


  // 📊 Management Information Systems (MIS)
  
  {
    title: "Propose an ERP Integration Strategy",
    major: "Management Information Systems",
    description: "A company's HR and Accounting departments use different software that don't talk to each other. Write a 1-page proposal on how implementing an ERP system will solve their data silos.",
    tags: ["Enterprising", "Investigative"],
    timeEstimate: "35 mins",
    difficulty: "Hard"
  },

  // 🧾 Accounting
  {
    title: "Reconcile a Monthly Balance Sheet",
    major: "Accounting",
    description: "Find the discrepancy. The company's cash log shows $5,000, but the bank statement shows $4,850. Identify the missing transactions from the provided receipt list.",
    tags: ["Conventional", "Investigative"],
    timeEstimate: "20 mins",
    difficulty: "Easy"
  },
 
 
  

  // 💼 Business Administration
  {
    title: "Draft a SWOT Analysis",
    major: "Business Administration",
    description: "Read the brief about a local coffee shop facing competition from a new Starbucks. Create a SWOT (Strengths, Weaknesses, Opportunities, Threats) matrix to help them survive.",
    tags: ["Enterprising", "Investigative"],
    timeEstimate: "25 mins",
    difficulty: "Medium"
  },
 

  // 🏛️ Architecture

  {
    title: "Design a Sustainable Facade",
    major: "Architecture",
    description: "Sketch a south-facing building exterior that maximizes natural sunlight in the winter but blocks harsh heat in the summer using louvers or overhangs.",
    tags: ["Artistic", "Investigative"],
    timeEstimate: "35 mins",
    difficulty: "Medium"
  },
  {
    title: "Map an E-Commerce Checkout Flow",
    major: "Management Information Systems",
    description: "Create a flowchart detailing what happens to data when a user clicks 'Buy Now'. Track the data from the UI, through the payment gateway API, to the inventory database.",
    tags: ["Investigative", "Conventional"],
    timeEstimate: "25 mins",
    difficulty: "Medium"
  },
  {
    title: "Identify Expense Anomalies",
    major: "Accounting",
    description: "Review the attached employee travel expense report. Flag the three items that violate the company's reimbursement policy and write a brief note to the employee.",
    tags: ["Conventional", "Enterprising"],
    timeEstimate: "15 mins",
    difficulty: "Easy"
  },
  
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