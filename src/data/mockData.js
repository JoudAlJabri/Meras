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


export const mockChallenges = [
  {
    title: 'Build a Simple Calculator',
    major: 'Computer Science',
    mentorName: 'Rana Abdullah',
    mentorId: '60d5ecb8b392d1',
    tags: ["Investigative", "Conventional"],
    description: 'Write a simple program that adds, subtracts, multiplies, and divides numbers.',
    difficulty: 'Beginner',
    timeEstimate: 30,
    whatYouWillLearn: [
      "How to take user input in a console application.",
      "Control flow using IF/ELSE or SWITCH statements.",
      "Basic mathematical operations in programming."
    ],
    whatYouWillDo: [
      "Set up your development environment.",
      "Write a function to accept two numbers and an operator.",
      "Return and print the correct mathematical result."
    ],
    whatYouWillNeed: [
      "A code editor (VS Code, Repl.it)",
      "Basic understanding of variables and functions"
    ],
    instructions: "Welcome to the Logic Lab! Your task is to design a fundamental piece of software: a working calculator. In this challenge, you will apply core programming concepts such as variables, user input, control flow, and arithmetic operations to create a working solution. The goal is not only to make the calculator work, but also to ensure that your code is clean, readable, and handles basic errors.\n\nYou should begin by analyzing the problem requirements carefully. Think about how the user will input their numbers and the operator (+, -, *, /). Your program should be designed in a way that gracefully handles invalid inputs, like dividing by zero or entering letters instead of numbers. Consider whether you want to use a series of 'if/else' statements or a 'switch' case, and justify why your chosen design is suitable.\n\nAs you develop your solution, pay attention to important design factors such as code formatting and variable naming conventions. A successful design should balance functionality, efficiency, and user experience.",
    referenceLinks: [
      { title: "YouTube: JavaScript Calculator Tutorial", url: "#" }
    ],
    downloadableFiles: []
  },
  {
    title: "Design a Custom Gear Train",
    major: "Mechanical Engineering",
    mentorName: 'Ahmed Al-Farsi',
    mentorId: '60d5ecb8b392d2',
    tags: ["Investigative", "Realistic"],
    description: "Calculate the required gear ratios to lift a 50kg weight using a standard 12V DC motor.",
    difficulty: "Intermediate",
    timeEstimate: 30,
    whatYouWillLearn: [
      "How to calculate mechanical advantage in a gear system.",
      "The relationship between torque and speed.",
      "Basic motor specification reading."
    ],
    whatYouWillDo: [
      "Review the provided motor datasheet.",
      "Calculate the required gear ratio using standard formulas.",
      "Sketch the sequence of gears needed."
    ],
    whatYouWillNeed: [
      "A calculator",
      "Pen and paper for sketching",
      "Basic understanding of multiplication and fractions"
    ],
    instructions: "Welcome to the Gear Lab! Your task is to design a gear train system capable of lifting a 50 kg load safely and efficiently. In this challenge, you will apply core engineering concepts such as torque, gear ratio, rotational speed, load distribution, and mechanical advantage to create a working solution. The goal is not only to make the system lift the load, but also to ensure that your design is stable, realistic, and mechanically sound.\n\nYou should begin by analyzing the problem requirements carefully. Think about the force needed to raise the load, the type of motor or input power available, and how gears can be arranged to convert speed into torque. Your gear train should be designed in a way that provides enough mechanical advantage to lift the weight without overloading the system. Consider whether you need a simple gear pair or a multi-stage gear train, and justify why your chosen design is suitable.\n\nAs you develop your solution, pay attention to important design factors such as gear size, number of teeth, shaft alignment, efficiency losses, and direction of rotation. You may also need to think about supporting components such as axles, frames, or mounting structures to ensure the gear train remains secure during operation. A successful design should balance strength, efficiency, and practicality.",
    referenceLinks: [
      { title: "Article: Torque vs. Speed", url: "#" }
    ],
    downloadableFiles: [
      { fileName: "12V_Motor_Datasheet.pdf", fileUrl: "#" },
      { fileName: "Gear_Calculation_Formulas.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Design a Smart Home Logic Circuit",
    major: "Electrical Engineering",
    mentorName: 'Sara Al-Dosari',
    mentorId: '60d5ecb8b392d3',
    tags: ["Investigative", "Realistic"],
    description: "Draw a logic gate circuit (AND/OR/NOT) that turns on sprinklers only under specific conditions.",
    difficulty: "Intermediate",
    timeEstimate: 25,
    whatYouWillLearn: [
      "Boolean logic and truth tables.",
      "How to combine logic gates (AND, OR, NOT).",
      "Real-world sensor application."
    ],
    whatYouWillDo: [
      "Define the inputs (Day/Night sensor, Moisture sensor).",
      "Draft a truth table for the desired outcomes.",
      "Draw the final logic gate circuit diagram."
    ],
    whatYouWillNeed: [
      "Circuit drawing tool or pen and paper",
      "Understanding of basic logic gates"
    ],
    instructions: "Welcome to the Circuits Lab! Your task is to design a smart home logic controller capable of managing a garden sprinkler system autonomously. In this challenge, you will apply core digital logic concepts such as Boolean algebra, truth tables, and logic gate configurations to create a working solution. The goal is to ensure the sprinklers activate ONLY if it is night time AND the soil moisture sensor reads dry.\n\nYou should begin by analyzing the problem requirements carefully. Think about your inputs: a light sensor (1 for day, 0 for night) and a moisture sensor (1 for wet, 0 for dry). Your logic circuit should be designed in a way that correctly evaluates these binary states to produce a single output (1 to turn on the water, 0 to keep it off). Consider whether you need to invert any signals using NOT gates before feeding them into an AND gate.\n\nAs you develop your solution, pay attention to important design factors such as minimizing the number of gates used to keep manufacturing costs down. A successful design should balance logical accuracy, simplicity, and component efficiency.",
    referenceLinks: [
      { title: "YouTube: Intro to Logic Gates", url: "#" }
    ],
    downloadableFiles: []
  },
  {
    title: "Scale Up a Chemical Reaction",
    major: "Chemical Engineering",
    mentorName: 'Faisal Abdullah',
    mentorId: '60d5ecb8b392d4',
    tags: ["Investigative", "Realistic"],
    description: "Calculate the required reactor volume and feed rate to scale a lab reaction to an industrial plant.",
    difficulty: "Advanced",
    timeEstimate: 40,
    whatYouWillLearn: [
      "Principles of chemical scale-up.",
      "Mass balance calculations.",
      "Reactor sizing basics."
    ],
    whatYouWillDo: [
      "Review the lab-scale yield data (10g/hour).",
      "Calculate the scaling factor for a 500kg/hour plant.",
      "Determine the new reactor volume and feed rates."
    ],
    whatYouWillNeed: [
      "Calculator",
      "Basic stoichiometry knowledge"
    ],
    instructions: "Welcome to the Process Engineering Lab! Your task is to design an industrial scale-up plan capable of taking a successful lab experiment and turning it into a commercial manufacturing process. In this challenge, you will apply core chemical engineering concepts such as mass balances, reaction kinetics, and volumetric scaling to create a working solution. The goal is to transition a reaction producing 10g per hour into a massive 500kg per hour plant.\n\nYou should begin by analyzing the problem requirements carefully. Think about the direct scaling factor required and how volume changes affect heat dissipation and mixing times. Your mathematical models should be designed in a way that accounts for the linear scale-up of raw materials while maintaining the same reaction residence time. Consider whether a Continuous Stirred-Tank Reactor (CSTR) or a Plug Flow Reactor (PFR) is more suitable for this volume, and justify why your chosen design is suitable.\n\nAs you develop your solution, pay attention to important design factors such as safety margins and potential bottlenecks in the feed rate. A successful design should balance mathematical accuracy, industrial practicality, and safety.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Reaction_Kinetics_Data.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Simulate a Projectile with Drag",
    major: "Physics",
    mentorName: "Tariq Al-Nasser",
    mentorId: "60d5ecb8b395d1",
    tags: ["Investigative", "Realistic"],
    description: "Calculate the landing coordinates of a launched projectile, accounting for atmospheric drag.",
    difficulty: "Advanced",
    timeEstimate: 60,
    whatYouWillLearn: [
      "Kinematics beyond standard vacuums.",
      "Applying atmospheric drag coefficients.",
      "Numerical integration using Euler's method."
    ],
    whatYouWillDo: [
      "Set up initial velocity and angle parameters.",
      "Write a Python loop to calculate step-by-step positions.",
      "Determine the exact landing coordinates."
    ],
    whatYouWillNeed: [
      "Python environment (Jupyter, Repl.it)",
      "Basic calculus and physics knowledge"
    ],
    instructions: "Welcome to the Computational Physics Lab! Your task is to design a physics simulation capable of predicting the exact landing spot of a projectile in the real world. Standard physics problems ignore air resistance, but in this challenge, you will apply core scientific concepts such as aerodynamic drag, gravity, vectors, and numerical integration to create a working solution. The goal is to move beyond textbook formulas and use code to solve complex, non-linear equations.\n\nYou should begin by analyzing the problem requirements carefully. Think about the forces acting on the object at any given millisecond: gravity pulling it down, and air resistance pushing back against its velocity vector. Your Python script should be designed in a way that loops through time in tiny steps (dt = 0.01s), recalculating acceleration, velocity, and position at every step. Consider how the changing speed alters the drag force constantly, and justify why Euler's method is a suitable approach for this simulation.\n\nAs you develop your solution, pay attention to important design factors such as your time-step resolution and code efficiency. A successful design should balance scientific rigor, coding best practices, and mathematical accuracy.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Python_Starter_Template.py", fileUrl: "#" }
    ]
  },
  {
    title: "Design a Custom CPU Instruction",
    major: "Computer Engineering",
    mentorName: "Omar Khalid",
    mentorId: "60d5ecb8b394d9",
    tags: ["Investigative", "Realistic"],
    description: "Map out the datapath and control signals to add a 'Multiply-Accumulate' instruction to a processor.",
    difficulty: "Advanced",
    timeEstimate: 90,
    whatYouWillLearn: [
      "CPU Datapath architecture.",
      "Instruction Set Architectures (ISA).",
      "Control signal routing."
    ],
    whatYouWillDo: [
      "Analyze the baseline 16-bit MIPS datapath schematic.",
      "Identify the new hardware components needed (Multiplier, Adders).",
      "Define the binary control signals for the new instruction."
    ],
    whatYouWillNeed: [
      "Understanding of computer architecture",
      "Ability to read logic schematics"
    ],
    instructions: "Welcome to the Hardware Architecture Lab! Your task is to design a hardware modification capable of executing a brand new machine-code instruction natively on a CPU. In this challenge, you will apply core computer engineering concepts such as datapath routing, ALU operations, multiplexers, and control unit logic to create a working solution. The goal is to add a 'Multiply-Accumulate' (MAC) instruction without breaking the existing MIPS architecture.\n\nYou should begin by analyzing the problem requirements carefully. Think about the flow of data: you need to read two registers, multiply them, read a third register, add the product to it, and write the result back. Your schematic updates should be designed in a way that efficiently routes these new electrical paths using the existing clock cycle. Consider whether you need to add new multiplexers to choose between the standard ALU output and your new MAC output, and justify your design.\n\nAs you develop your solution, pay attention to important design factors such as propagation delay and control signal binary values (RegWrite, ALUSrc, etc.). A successful design should balance hardware minimalization, performance, and logical correctness.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "16bit_CPU_Datapath.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Perform a Startup Valuation (DCF)",
    major: "Finance",
    mentorName: "Reem Al-Saud",
    mentorId: "60d5ecb8b394d1",
    tags: ["Enterprising", "Conventional", "Investigative"],
    description: "Project a tech startup's cash flows and calculate its present value to decide if you should invest.",
    difficulty: "Advanced",
    timeEstimate: 40,
    whatYouWillLearn: [
      "Discounted Cash Flow (DCF) modeling.",
      "Projecting revenue growth rates.",
      "Calculating the Time Value of Money."
    ],
    whatYouWillDo: [
      "Review the startup's historical financials.",
      "Project cash flows for the next 5 years.",
      "Apply a discount rate to find the Net Present Value (NPV)."
    ],
    whatYouWillNeed: [
      "Microsoft Excel or Google Sheets",
      "Basic accounting principles"
    ],
    instructions: "Welcome to the Investment Banking Lab! Your task is to design a financial model capable of determining the true intrinsic value of a fast-growing tech startup. In this challenge, you will apply core finance concepts such as revenue forecasting, weighted average cost of capital (WACC), terminal value, and discounted cash flows (DCF) to create a working solution. The goal is to provide a data-backed recommendation on whether your venture capital firm should invest millions into this company.\n\nYou should begin by analyzing the problem requirements carefully. Think about the assumptions you need to make regarding their year-over-year growth rate and profit margins. Your Excel model should be designed in a way that clearly separates assumptions from calculations, making it easy to change a single variable and see the impact on the final valuation. Consider the risks of the tech industry when selecting your discount rate, and justify why your chosen rate is suitable to account for investor risk.\n\nAs you develop your solution, pay attention to important design factors such as spreadsheet formatting, clear cell referencing, and objective financial analysis. A successful design should balance optimistic growth potential with conservative financial modeling.",
    referenceLinks: [
      { title: "Article: How to build a DCF Model", url: "#" }
    ],
    downloadableFiles: [
      { fileName: "Startup_Financials_Template.xlsx", fileUrl: "#" }
    ]
  },
  {
    title: "Draft a Floor Plan for a Tiny Home",
    major: "Architecture",
    mentorName: "Khalid Hassan",
    mentorId: "60d5ecb8b394d2",
    tags: ["Artistic", "Realistic"],
    description: "Sketch a functional 200 sq. ft. floor plan that maximizes spatial efficiency.",
    difficulty: "Advanced",
    timeEstimate: 40,
    whatYouWillLearn: [
      "Spatial planning and ergonomics.",
      "Scaling measurements on paper.",
      "Balancing aesthetics with severe constraints."
    ],
    whatYouWillDo: [
      "Define the required zones (sleep, eat, wash).",
      "Draft a 2D floor plan using a 1/4 inch scale.",
      "Label all dimensions and built-in furniture."
    ],
    whatYouWillNeed: [
      "Graph paper and pencil, or digital drawing app",
      "Ruler for scaling"
    ],
    instructions: "Welcome to the Design Studio! Your task is to design an architectural floor plan capable of providing comfortable living within a severe space constraint of just 200 square feet. In this challenge, you will apply core architectural concepts such as spatial flow, ergonomics, scaling, and multi-functional design to create a working solution. The goal is to prove that limited space does not mean a limited standard of living.\n\nYou should begin by analyzing the problem requirements carefully. Think about the human scale: how much room does a person need to stand up, open a fridge, or use a bathroom? Your layout should be designed in a way that minimizes wasted hallway space and maximizes natural light from windows. Consider whether you need to use vertical space (like a lofted bed) or transformable furniture, and justify why your chosen spatial arrangement is the most livable.\n\nAs you develop your solution, pay attention to important design factors such as line weights (walls vs. furniture), accurate scaling, and clear labeling. A successful design should balance structural realism, aesthetic flow, and extreme efficiency.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Tiny_Home_Constraints_Brief.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Thermal Analysis of a Coffee Cup",
    major: "Mechanical Engineering",
    mentorName: "Ahmed Al-Farsi",
    mentorId: "60d5ecb8b392d2",
    tags: ["Investigative", "Realistic"],
    description: "Analyze the heat loss of a ceramic vs. insulated steel coffee mug over 30 minutes.",
    difficulty: "Beginner",
    timeEstimate: 20,
    whatYouWillLearn: [
      "Fundamentals of heat transfer (Conduction & Convection).",
      "Applying Newton's Law of Cooling.",
      "Material thermal properties."
    ],
    whatYouWillDo: [
      "Review the thermal conductivity values for ceramic and steel.",
      "Calculate the expected temperature drop over 30 minutes.",
      "Write a short conclusion on which material is superior for heat retention."
    ],
    whatYouWillNeed: [
      "Calculator",
      "Thermodynamics formulas"
    ],
    instructions: "Welcome to the Thermodynamics Lab! Your task is to design a comparative thermal analysis capable of proving which material makes the best coffee mug. In this challenge, you will apply core mechanical engineering concepts such as heat transfer, thermal conductivity, insulation layers, and Newton's Law of Cooling to create a working solution. The goal is to move beyond guessing and use math to determine exactly how fast a 90°C liquid will cool down in different environments.\n\nYou should begin by analyzing the problem requirements carefully. Think about the paths of heat loss: conduction through the walls of the mug, and convection from the exposed surface of the liquid to the air. Your calculations should be designed in a way that accurately accounts for the thickness of the mug walls and the ambient room temperature. Consider the impact of a vacuum-sealed double wall versus a solid ceramic wall, and justify your mathematical findings.\n\nAs you develop your solution, pay attention to important design factors such as keeping your units consistent (Joules, Watts, Kelvin). A successful design should balance accurate thermodynamics equations with practical consumer engineering insights.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Thermo_Cheat_Sheet.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Analyze Artificial Blood Flow Dynamics",
    major: "Bio Engineering",
    mentorName: "Layla Hassan",
    mentorId: "60d5ecb8b392d5",
    tags: ["Investigative", "Conventional"],
    description: "Calculate the pressure drop across an artificial heart valve using Bernoulli's equation.",
    difficulty: "Advanced",
    timeEstimate: 30,
    whatYouWillLearn: [
      "Fluid mechanics in biological systems.",
      "Application of Bernoulli's equation.",
      "Calculating pressure differentials."
    ],
    whatYouWillDo: [
      "Extract fluid velocity and density data from the brief.",
      "Apply Bernoulli's principle to find the pressure drop.",
      "Determine if the pressure drop is within safe medical limits."
    ],
    whatYouWillNeed: [
      "Calculator",
      "Understanding of physics/fluid dynamics"
    ],
    instructions: "Welcome to the Biomechanics Lab! Your task is to design a fluid dynamic analysis capable of ensuring a new 3D-printed artificial heart valve is safe for human implantation. In this challenge, you will apply core bioengineering concepts such as fluid mechanics, pressure gradients, flow velocity, and Bernoulli's principle to create a working solution. The goal is to ensure the mechanical valve does not force the heart to work too hard to pump blood through it.\n\nYou should begin by analyzing the problem requirements carefully. Think about the conservation of energy in a fluid system: as the blood speeds up to pass through the narrow opening of the artificial valve, the pressure must drop. Your calculations should be designed in a way that uses the provided density of human blood and the peak systolic velocity to find this exact pressure differential. Consider whether the resulting pressure drop is low enough to prevent red blood cell damage (hemolysis), and justify your medical engineering conclusion.\n\nAs you develop your solution, pay attention to important design factors such as unit conversions (mmHg to Pascals) and physiological realism. A successful design should balance rigorous physics calculations with an understanding of human biology constraints.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Valve_Fluid_Data.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Analyze a Business Case",
    major: "Business Administration",
    mentorName: "Noura Salem",
    mentorId: "60d5ecb8b392d6",
    tags: ["Enterprising", "Investigative"],
    description: "Read a short business scenario, identify core operational problems, and propose solutions.",
    difficulty: "Intermediate",
    timeEstimate: 60,
    whatYouWillLearn: [
      "Strategic business analysis.",
      "Identifying operational bottlenecks.",
      "Professional business writing."
    ],
    whatYouWillDo: [
      "Read the provided 2-page case study on a struggling retail company.",
      "Identify the 3 main root causes of their declining profits.",
      "Write a 200-word executive summary proposing strategic solutions."
    ],
    whatYouWillNeed: [
      "Critical thinking skills",
      "Word processor"
    ],
    instructions: "Welcome to the Strategy Boardroom! Your task is to design a business intervention plan capable of saving a struggling mid-sized retail chain from bankruptcy. In this challenge, you will apply core business administration concepts such as operational efficiency, market positioning, cost analysis, and strategic management to create a working solution. The goal is to look past the surface-level symptoms (declining sales) and identify the true root causes hidden in the case study data.\n\nYou should begin by analyzing the problem requirements carefully. Think about the supply chain delays, the high employee turnover, and the shifting consumer trends mentioned in the brief. Your analysis should be designed in a way that connects these disparate data points into a cohesive narrative of why the business is failing. Consider whether the primary issue is a marketing failure or a leadership failure, and justify your strategic recommendations based on the facts provided.\n\nAs you develop your solution, pay attention to important design factors such as tone, clarity, and conciseness in your writing. A successful design should balance analytical rigor, actionable strategy, and professional executive communication.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Retail_Case_Study.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Debug a Verilog Traffic Controller",
    major: "Computer Engineering",
    mentorName: "Sara Al-Dosari",
    mentorId: "60d5ecb8b393d8",
    tags: ["Investigative", "Conventional"],
    description: "Find and fix the timing glitch in a hardware description script causing a traffic light error.",
    difficulty: "Advanced",
    timeEstimate: 60,
    whatYouWillLearn: [
      "Hardware Description Languages (Verilog).",
      "Finite State Machine (FSM) debugging.",
      "Identifying race conditions."
    ],
    whatYouWillDo: [
      "Read the provided Verilog (.v) code for an intersection.",
      "Trace the state transitions to find the logic error.",
      "Rewrite the faulty block to prevent the green-light collision."
    ],
    whatYouWillNeed: [
      "Basic understanding of digital logic and state machines",
      "Text editor"
    ],
    instructions: "Welcome to the FPGA Lab! Your task is to debug a hardware description language script capable of safely controlling a busy 4-way traffic intersection. In this challenge, you will apply core computer engineering concepts such as Finite State Machines (FSM), clock cycles, non-blocking assignments, and digital timing logic to create a working solution. The goal is to fix a critical race condition that is causing both directions to show a green light simultaneously for exactly one clock cycle.\n\nYou should begin by analyzing the problem requirements carefully. Think about how the state transitions are triggered by the clock edge. Your debugging process should be designed in a way that traces the exact values of the registers during the transition from State 2 (Yellow) to State 3 (Red/Green). Consider whether the issue is caused by a missing default state, a blocking (=) vs. non-blocking (<=) assignment error, or a delayed signal propagation, and justify your code correction.\n\nAs you develop your solution, pay attention to important design factors such as code syntax and hardware realism. A successful design should balance logical precision, safe fail-states, and clean Verilog architecture.",
    referenceLinks: [
      { title: "Article: Blocking vs Non-Blocking in Verilog", url: "#" }
    ],
    downloadableFiles: [
      { fileName: "traffic_controller.v", fileUrl: "#" }
    ]
  },
  {
    title: "Design a Water Filtration Sequence",
    major: "Chemical Engineering",
    mentorName: "Faisal Abdullah",
    mentorId: "60d5ecb8b392d4",
    tags: ["Investigative", "Realistic"],
    description: "Arrange 5 separation techniques in the correct order to turn river water into safe drinking water.",
    difficulty: "Intermediate",
    timeEstimate: 20,
    whatYouWillLearn: [
      "Industrial separation processes.",
      "Unit operations sequencing.",
      "Water treatment fundamentals."
    ],
    whatYouWillDo: [
      "Analyze the list of contaminants in the raw river water.",
      "Arrange the 5 equipment modules (e.g., UV, Carbon Filter, Sand) in the correct physical order.",
      "Write a brief justification for your sequence."
    ],
    whatYouWillNeed: [
      "Critical thinking",
      "Basic chemistry knowledge"
    ],
    instructions: "Welcome to the Unit Operations Lab! Your task is to design an industrial separation sequence capable of purifying heavily contaminated river water into safe, potable drinking water. In this challenge, you will apply core chemical engineering concepts such as filtration, adsorption, reverse osmosis, flow sequencing, and particle sizing to create a working solution. The goal is to arrange the provided physical and chemical treatment modules in the most efficient and logical order to prevent equipment failure.\n\nYou should begin by analyzing the problem requirements carefully. Think about the size of the contaminants: you wouldn't send large debris directly into a sensitive, expensive reverse osmosis membrane because it would clog immediately. Your sequence should be designed in a way that removes the largest particles first (macro-filtration), followed by organic chemicals, and finally microscopic pathogens. Consider where the UV sterilization light must be placed for maximum effectiveness, and justify why your step-by-step flow protects both the consumer and the machinery.\n\nAs you develop your solution, pay attention to important design factors such as pressure drops across filters and operational logic. A successful design should balance environmental engineering best practices, public health safety, and system longevity.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Contaminant_Data_Sheet.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Analyze Well Log Data",
    major: "Petroleum Engineering",
    mentorName: "Saud Al-Qahtani",
    mentorId: "60d5ecb8b393d9",
    tags: ["Investigative", "Conventional"],
    description: "Examine electrical resistivity and gamma-ray logs to identify an oil-bearing reservoir.",
    difficulty: "Advanced",
    timeEstimate: 35,
    whatYouWillLearn: [
      "Subsurface geology interpretation.",
      "Reading Gamma Ray and Resistivity logs.",
      "Identifying hydrocarbon zones."
    ],
    whatYouWillDo: [
      "Analyze the provided well log graphic.",
      "Identify the depth where the sandstone layer begins.",
      "Determine if the pore space is filled with water or oil based on resistivity."
    ],
    whatYouWillNeed: [
      "Attention to detail",
      "Basic understanding of rock properties"
    ],
    instructions: "Welcome to the Petrophysics Lab! Your task is to design a subsurface interpretation capable of pinpointing a multi-million dollar oil reservoir thousands of feet underground. In this challenge, you will apply core petroleum engineering concepts such as rock porosity, fluid saturation, gamma-ray emissions, and electrical resistivity to create a working solution. The goal is to read the raw data recorded by sensors lowered into a wellbore and translate those squiggly lines into a geological map.\n\nYou should begin by analyzing the problem requirements carefully. Think about how different rocks and fluids react to sensors. A low gamma-ray reading indicates a clean rock like sandstone, while a high reading indicates shale. Your analysis should be designed in a way that cross-references the rock type with the electrical resistivity log—since oil does not conduct electricity, a sudden spike in resistivity inside a clean sandstone implies hydrocarbons. Consider exactly at what depth these two indicators align, and justify your conclusion on where the drilling team should perforate the pipe.\n\nAs you develop your solution, pay attention to important design factors such as depth measurement accuracy and fluid contact boundaries. A successful design should balance geological science, data interpretation, and economic decision-making.",
    referenceLinks: [
      { title: "YouTube: Basics of Well Logging", url: "#" }
    ],
    downloadableFiles: [
      { fileName: "Well_Log_Graph.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Create a 30-Day Onboarding Plan",
    major: "Business Administration",
    mentorName: "Noura Salem",
    mentorId: "60d5ecb8b392d6",
    tags: ["Social", "Enterprising"],
    description: "Design a bulleted 30-day onboarding schedule for a new Marketing Manager.",
    difficulty: "Intermediate",
    timeEstimate: 30,
    whatYouWillLearn: [
      "Human Resources (HR) strategy.",
      "Employee retention techniques.",
      "Organizational behavior."
    ],
    whatYouWillDo: [
      "Identify the key milestones a new hire needs to hit in their first month.",
      "Draft a structured, week-by-week schedule.",
      "Include training, team integrations, and first-project deliverables."
    ],
    whatYouWillNeed: [
      "Empathy and organizational skills",
      "Word processor"
    ],
    instructions: "Welcome to the Human Resources Lab! Your task is to design an organizational integration plan capable of stopping a high employee turnover rate caused by a poor new-hire experience. In this challenge, you will apply core business administration concepts such as organizational behavior, talent retention, milestone setting, and corporate culture integration to create a working solution. The goal is to build a structured 30-day roadmap for a new Marketing Manager so they feel supported, equipped, and productive from Day 1.\n\nYou should begin by analyzing the problem requirements carefully. Think about the psychological journey of a new employee—they need logistical setup (laptops, accounts), social integration (meeting key stakeholders), and clear expectations. Your schedule should be designed in a way that gradually ramps up their responsibilities, moving from shadowing in Week 1 to executing a small campaign by Week 4. Consider how to balance independent learning time with collaborative meetings, and justify why your pacing prevents burnout.\n\nAs you develop your solution, pay attention to important design factors such as clear deliverables, scheduled check-ins, and a welcoming tone. A successful design should balance strategic HR management, operational efficiency, and human empathy.",
    referenceLinks: [],
    downloadableFiles: []
  },
  {
    title: "Calculate Bridge Truss Load",
    major: "Civil Engineering",
    mentorName: "Yousef Al-Harbi",
    mentorId: "60d5ecb8b394d3",
    tags: ["Investigative", "Realistic"],
    description: "Calculate the tension and compression forces on a steel bridge truss when a truck crosses.",
    difficulty: "Advanced",
    timeEstimate: 45,
    whatYouWillLearn: [
      "Statics and structural analysis.",
      "The Method of Joints.",
      "Identifying tension vs. compression."
    ],
    whatYouWillDo: [
      "Examine the provided truss diagram and the 2-ton point load.",
      "Use trigonometry and equilibrium equations (Sum of Forces = 0) at key joints.",
      "Solve for the internal force of three specific steel members."
    ],
    whatYouWillNeed: [
      "Calculator with Trig functions",
      "Understanding of Statics (Physics)"
    ],
    instructions: "Welcome to the Structures Lab! Your task is to design a statics analysis capable of proving whether a steel bridge truss will hold up under the weight of heavy traffic or collapse into the river below. In this challenge, you will apply core civil engineering concepts such as vector mechanics, equilibrium equations, geometry, and the Method of Joints to create a working solution. The goal is to mathematically determine exactly how much force is flowing through individual steel beams when a 2-ton truck parks on the center span.\n\nYou should begin by analyzing the problem requirements carefully. Think about the fundamental rule of statics: if the bridge is not moving, the sum of all forces in the X and Y directions must equal zero. Your mathematical approach should be designed in a way that starts at the bridge supports to find the reaction forces, and then systematically moves from joint to joint, using trigonometry to break diagonal forces into horizontal and vertical components. Consider whether each specific beam is being pulled apart (tension) or squished together (compression), and justify your findings.\n\nAs you develop your solution, pay attention to important design factors such as sign conventions (+ for tension, - for compression) and clear free-body diagrams. A successful design should balance rigorous mathematical proofs with structural safety principles.",
    referenceLinks: [
      { title: "YouTube: Method of Joints Explained", url: "#" }
    ],
    downloadableFiles: [
      { fileName: "Bridge_Truss_Diagram.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Diversify a Client's Portfolio",
    major: "Finance",
    mentorName: "Reem Al-Saud",
    mentorId: "60d5ecb8b394d1",
    tags: ["Enterprising", "Conventional"],
    description: "Reallocate a $100,000 retirement portfolio across stocks, bonds, and ETFs to match a low-risk profile.",
    difficulty: "Intermediate",
    timeEstimate: 20,
    whatYouWillLearn: [
      "Asset allocation strategy.",
      "Risk vs. Reward profiles.",
      "The role of bonds and ETFs."
    ],
    whatYouWillDo: [
      "Review the 60-year-old client's risk tolerance.",
      "Select percentages for Equities, Fixed Income, and Cash.",
      "Assign the $100k across specific provided assets to meet the target allocation."
    ],
    whatYouWillNeed: [
      "Calculator",
      "Basic understanding of investment types"
    ],
    instructions: "Welcome to the Wealth Management Lab! Your task is to design an investment portfolio allocation capable of protecting the life savings of a 60-year-old client nearing retirement. In this challenge, you will apply core finance concepts such as asset diversification, risk mitigation, yield analysis, and modern portfolio theory to create a working solution. The goal is to shift their $100,000 away from highly volatile tech stocks and into a stable, income-generating mix that preserves their capital.\n\nYou should begin by analyzing the problem requirements carefully. Think about the inverse relationship between risk and reward: a client this close to retirement cannot afford a 30% market crash, so they require a heavy weighting in fixed-income securities (bonds) rather than aggressive equities (stocks). Your reallocation should be designed in a way that spreads the money across different asset classes to insulate against specific sector failures. Consider the exact percentage split (e.g., 60% bonds, 30% ETFs, 10% cash), and justify why your chosen asset mix provides the necessary safety net.\n\nAs you develop your solution, pay attention to important design factors such as inflation risk and dividend yields. A successful design should balance financial mathematics, macroeconomic awareness, and fiduciary responsibility to the client.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Asset_Options_List.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Design an Ergonomic Prosthetic Grip",
    major: "Bio Engineering",
    mentorName: "Layla Hassan",
    mentorId: "60d5ecb8b392d5",
    tags: ["Investigative", "Realistic"],
    description: "Sketch a mechanism for a 3D-printed prosthetic hand that allows the user to safely hold a fragile egg.",
    difficulty: "Intermediate",
    timeEstimate: 35,
    whatYouWillLearn: [
      "Biomechanics of the human hand.",
      "Force feedback mechanisms.",
      "Prosthetic design constraints."
    ],
    whatYouWillDo: [
      "Analyze the anatomical grip required to hold delicate objects.",
      "Incorporate a flex-sensor constraint to prevent crushing.",
      "Sketch the mechanical tendon routing for the fingers."
    ],
    whatYouWillNeed: [
      "Pen and paper for sketching",
      "Creative problem-solving"
    ],
    instructions: "Welcome to the Prosthetics Lab! Your task is to design a biomechanical mechanism capable of replicating the fine motor control of a human hand. In this challenge, you will apply core bioengineering concepts such as ergonomics, force distribution, sensor integration, and mechanical linkage to create a working solution. The goal is to draft a 3D-printable finger assembly that has the delicate touch required to pick up a raw egg without shattering it, while still being simple to manufacture.\n\nYou should begin by analyzing the problem requirements carefully. Think about how human tendons pull fingers closed and how our nervous system tells us when to stop squeezing. Your mechanical sketch should be designed in a way that mimics these tendons using cables, and integrates the provided 'flex-sensor' data to create a mechanical stopping point before the crush-force threshold is reached. Consider the shape of the fingertips (e.g., adding a silicone pad for grip), and justify why your design choices increase usability for the patient.\n\nAs you develop your solution, pay attention to important design factors such as the weight of the materials, the friction in the joints, and the ease of repair. A successful design should balance mechanical ingenuity, biological mimicry, and patient-centered ergonomics.",
    referenceLinks: [
      { title: "Article: How 3D Printed Prosthetics Work", url: "#" }
    ],
    downloadableFiles: []
  },
  {
    title: "Calculate Household Power Load",
    major: "Electrical Engineering",
    mentorName: "Sara Al-Dosari",
    mentorId: "60d5ecb8b392d3",
    tags: ["Investigative", "Conventional"],
    description: "Calculate total amperage draw to determine if a standard 15-amp circuit breaker will trip.",
    difficulty: "Beginner",
    timeEstimate: 15,
    whatYouWillLearn: [
      "Ohm's Law (Power = Voltage x Current).",
      "Circuit breaker limits.",
      "Real-world electrical safety."
    ],
    whatYouWillDo: [
      "Review the wattage of the 4 appliances on the list.",
      "Convert the total Watts to Amps using standard 120V household voltage.",
      "Conclude whether the 15-amp breaker will trip."
    ],
    whatYouWillNeed: [
      "Calculator",
      "Basic algebra"
    ],
    instructions: "Welcome to the Power Systems Lab! Your task is to design an electrical load analysis capable of preventing a residential power failure. In this challenge, you will apply core electrical engineering concepts such as Ohm's Law, power consumption (Watts), current flow (Amps), and circuit safety limits to create a working solution. The goal is to mathematically determine if turning on a microwave, a toaster, and a blender at the same time will blow a fuse.\n\nYou should begin by analyzing the problem requirements carefully. Think about the relationship between Power, Voltage, and Current (P = V * I). Your calculations should be designed in a way that sums up the total wattage of all active appliances and divides that number by the standard household voltage to find the total amperage pulled through the wires. Consider the physical safety limit of a standard 15-Amp circuit breaker, and justify whether the system is safe to operate or if it requires a secondary circuit.\n\nAs you develop your solution, pay attention to important design factors such as unit consistency and leaving a standard 80% safety margin. A successful design should balance mathematical accuracy with practical residential safety codes.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Appliance_Wattage_List.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Debug a Python Sorting Algorithm",
    major: "Computer Science",
    mentorName: "Rana Abdullah",
    mentorId: "60d5ecb8b392d1",
    tags: ["Investigative", "Conventional"],
    description: "Find the logic error in a Bubble Sort script that is causing it to crash, and fix the code.",
    difficulty: "Beginner",
    timeEstimate: 20,
    whatYouWillLearn: [
      "Algorithm logic (Bubble Sort).",
      "Python syntax debugging.",
      "Index out of bounds errors."
    ],
    whatYouWillDo: [
      "Review the provided 15-line Python script.",
      "Identify why the loop is crashing on the final iteration.",
      "Modify the loop range or array index to fix it."
    ],
    whatYouWillNeed: [
      "Python environment or IDE",
      "Understanding of Arrays/Lists"
    ],
    instructions: "Welcome to the Algorithms Lab! Your task is to debug a sorting function capable of taking a chaotic array of numbers and ordering them perfectly. In this challenge, you will apply core computer science concepts such as array indexing, loop iteration, variable swapping, and syntax debugging to create a working solution. The goal is to hunt down a pesky 'Index Out of Bounds' error hidden inside a classic Bubble Sort implementation.\n\nYou should begin by analyzing the problem requirements carefully. Think about how a Bubble Sort works: it compares two adjacent numbers and swaps them if they are in the wrong order. Your debugging process should be designed in a way that traces the value of your loop counter 'i' as it reaches the very end of the array. Consider what happens when the code tries to compare the last element `array[i]` with a non-existent next element `array[i+1]`, and justify your code correction.\n\nAs you develop your solution, pay attention to important design factors such as off-by-one errors and code readability. A successful design should balance algorithmic efficiency, correct syntax, and defensive programming practices.",
    referenceLinks: [
      { title: "YouTube: Visualizing Bubble Sort", url: "#" }
    ],
    downloadableFiles: [
      { fileName: "broken_sort.py", fileUrl: "#" }
    ]
  },
  {
    title: "Sketch a Floor Plan",
    major: "Architecture",
    mentorName: "Khalid Hassan",
    mentorId: "60d5ecb8b394d2",
    tags: ["Artistic", "Realistic"],
    description: "Design a basic 3-bedroom apartment layout using graph paper.",
    difficulty: "Beginner",
    timeEstimate: 45,
    whatYouWillLearn: [
      "Basic spatial arrangements.",
      "Traffic flow in residential design.",
      "Standard room sizing."
    ],
    whatYouWillDo: [
      "Determine the placement of the kitchen, living room, and 3 bedrooms.",
      "Sketch the walls, doors, and windows on a grid.",
      "Ensure logical flow (e.g., bathrooms accessible from bedrooms)."
    ],
    whatYouWillNeed: [
      "Graph paper and pencil",
      "Ruler"
    ],
    instructions: "Welcome to the Drafting Studio! Your task is to design a residential floor plan capable of housing a family comfortably in a 3-bedroom apartment. In this challenge, you will apply core architectural concepts such as spatial zoning, traffic flow, natural light access, and room proportionality to create a working solution. The goal is to arrange blank space into a logical, livable home where private spaces are separated from public entertaining areas.\n\nYou should begin by analyzing the problem requirements carefully. Think about the daily routine of the inhabitants: they need to cook, sleep, and relax. Your layout should be designed in a way that clusters the 'wet zones' (kitchen and bathrooms) together to save on plumbing costs, while ensuring the bedrooms are tucked away in the quieter corners of the unit. Consider the placement of windows for cross-ventilation, and justify why your chosen room arrangement makes the apartment feel spacious.\n\nAs you develop your solution, pay attention to important design factors such as drawing doors that don't block hallways when opened, and maintaining a consistent scale. A successful design should balance artistic vision, human ergonomics, and structural common sense.",
    referenceLinks: [],
    downloadableFiles: []
  },
  {
    title: "Design a Database Schema",
    major: "Computer Science",
    mentorName: "Rana Abdullah",
    mentorId: "60d5ecb8b392d1",
    tags: ["Investigative", "Conventional"],
    description: "Draw an Entity-Relationship (ER) diagram for a University Library system.",
    difficulty: "Intermediate",
    timeEstimate: 30,
    whatYouWillLearn: [
      "Relational Database Design.",
      "Primary and Foreign Keys.",
      "One-to-Many Relationships."
    ],
    whatYouWillDo: [
      "Identify the core entities (Books, Students, Checkouts).",
      "Define the attributes for each entity (e.g., Book ID, Title).",
      "Draw lines connecting the entities to show their relationships."
    ],
    whatYouWillNeed: [
      "Diagramming tool (Draw.io, Lucidchart) or paper",
      "Understanding of basic data structures"
    ],
    instructions: "Welcome to the Data Architecture Lab! Your task is to design a relational database schema capable of managing thousands of transactions for a busy University Library. In this challenge, you will apply core software engineering concepts such as data normalization, entity-relationship mapping, primary keys, and foreign key constraints to create a working solution. The goal is to structure data in a way that prevents duplication and allows the library software to instantly know who checked out which book.\n\nYou should begin by analyzing the problem requirements carefully. Think about the 'things' (Entities) the library needs to track: Books, Students, and the act of Checking Out. Your Entity-Relationship (ER) diagram should be designed in a way that clearly lists the columns (Attributes) for each table, making sure every row has a unique identifier (Primary Key). Consider how a 'Checkout' table acts as a bridge to link a Student to a Book, and justify the type of relationship (One-to-Many vs. Many-to-Many).\n\nAs you develop your solution, pay attention to important design factors such as data types (String, Integer, Date) and referential integrity. A successful design should balance structural elegance, query efficiency, and future scalability.",
    referenceLinks: [
      { title: "Article: What is an ER Diagram?", url: "#" }
    ],
    downloadableFiles: []
  },
  {
    title: "Calculate Safe Drilling Mud Weight",
    major: "Petroleum Engineering",
    mentorName: "Saud Al-Qahtani",
    mentorId: "60d5ecb8b393d9",
    tags: ["Investigative", "Realistic"],
    description: "Calculate the exact density of drilling fluid required to prevent a blowout without fracturing the rock.",
    difficulty: "Intermediate",
    timeEstimate: 25,
    whatYouWillLearn: [
      "Hydrostatic pressure principles.",
      "Wellbore stability.",
      "Mud weight window calculations."
    ],
    whatYouWillDo: [
      "Review the formation pressure at 10,000 feet.",
      "Review the fracture gradient of the surrounding rock.",
      "Calculate a mud density (in ppg) that sits safely between those two limits."
    ],
    whatYouWillNeed: [
      "Calculator",
      "Basic understanding of pressure/depth formulas"
    ],
    instructions: "Welcome to the Drilling Engineering Lab! Your task is to design a hydrostatic fluid plan capable of safely drilling an oil well 10,000 feet deep. In this challenge, you will apply core petroleum engineering concepts such as hydrostatic pressure, fracture gradients, pore pressure, and fluid density to create a working solution. The goal is to engineer a 'drilling mud' that is heavy enough to hold back highly pressurized explosive gas, but light enough that it doesn't crack the surrounding rock and cause a catastrophic leak.\n\nYou should begin by analyzing the problem requirements carefully. Think about the delicate balance required in the wellbore: you must maintain a pressure that is higher than the formation gas pressure, but lower than the rock's fracture pressure. Your mathematical calculations should be designed in a way that converts the pressure data into an exact fluid density requirement (measured in pounds per gallon). Consider the safety margins needed in case the pumps stop, and justify your chosen mud weight.\n\nAs you develop your solution, pay attention to important design factors such as unit conversions and hydrostatic equation accuracy. A successful design should balance rigorous mathematics, geological realities, and extreme operational safety.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Pressure_Gradient_Data.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Design a Sustainable Intersection",
    major: "Civil Engineering",
    mentorName: "Yousef Al-Harbi",
    mentorId: "60d5ecb8b394d3",
    tags: ["Investigative", "Artistic"],
    description: "Redesign a messy 4-way city intersection to optimize traffic flow and pedestrian safety.",
    difficulty: "Intermediate",
    timeEstimate: 30,
    whatYouWillLearn: [
      "Urban traffic flow optimization.",
      "Pedestrian safety infrastructure.",
      "Spatial planning for vehicles and bikes."
    ],
    whatYouWillDo: [
      "Review the aerial diagram of the dangerous intersection.",
      "Draft a new layout incorporating dedicated turn lanes and crosswalks.",
      "Add protected bike lane infrastructure."
    ],
    whatYouWillNeed: [
      "Drawing tool or pen and paper",
      "Creative problem solving"
    ],
    instructions: "Welcome to the Urban Planning Lab! Your task is to design a civil infrastructure layout capable of fixing one of the most dangerous, congested intersections in the city. In this challenge, you will apply core civil engineering concepts such as traffic flow optimization, conflict-point reduction, pedestrian safety, and sustainable transit integration to create a working solution. The goal is to transform a chaotic layout of asphalt into an organized system that protects cars, bikers, and walkers equally.\n\nYou should begin by analyzing the problem requirements carefully. Think about where the 'conflict points' are—where do cars turning left cross paths with pedestrians walking straight? Your redesign should be designed in a way that separates these modes of transport, perhaps by adding dedicated turn lanes, traffic islands, or advanced signal phases. Consider how to safely route a protected bike lane through the intersection without putting cyclists in a vehicle's blind spot, and justify your layout choices.\n\nAs you develop your solution, pay attention to important design factors such as turning radii for large trucks and clear lane markings. A successful design should balance vehicular throughput, urban aesthetics, and absolute public safety.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Aerial_Intersection_Map.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Propose an ERP Integration Strategy",
    major: "Management Information Systems",
    mentorName: "Khaled Al-Zahrani",
    mentorId: "60d5ecb8b396d1",
    tags: ["Enterprising", "Investigative"],
    description: "Write a 1-page proposal on how implementing an ERP system will solve a company's data silos.",
    difficulty: "Advanced",
    timeEstimate: 35,
    whatYouWillLearn: [
      "Enterprise Resource Planning (ERP) basics.",
      "Solving data silos.",
      "IT Project Management communication."
    ],
    whatYouWillDo: [
      "Read the brief about the HR and Accounting software disconnect.",
      "Identify the costs and inefficiencies caused by this silo.",
      "Draft a persuasive proposal recommending a unified ERP system."
    ],
    whatYouWillNeed: [
      "Word processor",
      "Business communication skills"
    ],
    instructions: "Welcome to the IT Strategy Boardroom! Your task is to design a technology integration proposal capable of saving a rapidly growing enterprise from drowning in disorganized data. In this challenge, you will apply core Management Information Systems (MIS) concepts such as Enterprise Resource Planning (ERP), data silos, workflow automation, and systems architecture to create a working solution. The goal is to convince the CEO that replacing their fragmented legacy software with a unified database is worth the million-dollar investment.\n\nYou should begin by analyzing the problem requirements carefully. Think about the daily friction occurring between the HR department and the Accounting department because their software programs cannot 'talk' to each other, leading to manual data entry and payroll errors. Your proposal should be designed in a way that clearly outlines the financial and operational benefits of having a single source of truth across the company. Consider the risks of the transition period, and justify why the long-term ROI makes a modern ERP essential.\n\nAs you develop your solution, pay attention to important design factors such as executive tone, clear formatting, and business-focused metrics rather than just technical jargon. A successful design should balance deep technical understanding, strategic foresight, and persuasive corporate communication.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Company_IT_Audit_Report.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Reconcile a Monthly Balance Sheet",
    major: "Accounting",
    mentorName: "Mona Al-Dosari",
    mentorId: "60d5ecb8b397d2",
    tags: ["Conventional", "Investigative"],
    description: "Find the discrepancy between the company's cash log and the official bank statement.",
    difficulty: "Beginner",
    timeEstimate: 20,
    whatYouWillLearn: [
      "Bank reconciliation processes.",
      "Double-entry bookkeeping basics.",
      "Identifying financial anomalies."
    ],
    whatYouWillDo: [
      "Compare the internal ledger showing $5,000 against the bank statement showing $4,850.",
      "Cross-reference a list of 10 recent transactions.",
      "Identify the missing or unrecorded item that accounts for the $150 difference."
    ],
    whatYouWillNeed: [
      "Calculator",
      "Attention to detail"
    ],
    instructions: "Welcome to the Financial Audit Lab! Your task is to design an accounting reconciliation capable of tracking down missing funds and ensuring a company's financial records are perfectly accurate. In this challenge, you will apply core accounting concepts such as ledger balancing, bank reconciliation, transaction auditing, and financial forensics to create a working solution. The goal is to solve the mystery of why the company thinks it has $5,000 in cash, while the bank says it only has $4,850.\n\nYou should begin by analyzing the problem requirements carefully. Think about how timing differences occur in business—perhaps a check was written but hasn't been cashed yet, or a bank fee was automatically deducted without the accountant knowing. Your reconciliation process should be designed in a way that systematically ticks off every matching transaction on both lists until only the anomalies remain. Consider whether the missing $150 is a single forgotten expense or a combination of multiple smaller errors, and justify your final adjusted balance.\n\nAs you develop your solution, pay attention to important design factors such as methodical checking and clear documentation of your findings. A successful design should balance numerical precision, investigative tenacity, and adherence to strict accounting principles.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Ledger_vs_Bank_Statement.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Draft a SWOT Analysis",
    major: "Business Administration",
    mentorName: "Noura Salem",
    mentorId: "60d5ecb8b392d6",
    tags: ["Enterprising", "Investigative"],
    description: "Create a SWOT matrix to help a local coffee shop survive new corporate competition.",
    difficulty: "Intermediate",
    timeEstimate: 25,
    whatYouWillLearn: [
      "Strategic market analysis.",
      "The SWOT framework.",
      "Competitive positioning."
    ],
    whatYouWillDo: [
      "Read the brief about the local coffee shop and the new Starbucks opening nearby.",
      "Categorize the shop's Internal factors (Strengths, Weaknesses).",
      "Categorize the shop's External factors (Opportunities, Threats)."
    ],
    whatYouWillNeed: [
      "Critical thinking",
      "Word processor or paper to draw the matrix"
    ],
    instructions: "Welcome to the Strategy Boardroom! Your task is to design a competitive market analysis capable of helping a small, independent coffee shop survive the sudden arrival of a massive corporate competitor. In this challenge, you will apply core business administration concepts such as market positioning, competitive advantage, internal resource auditing, and the SWOT framework to create a working solution. The goal is to map out the battlefield so the small business owner can pivot their strategy before they lose their customers.\n\nYou should begin by analyzing the problem requirements carefully. Think about the internal realities of the business: what do they do better than anyone else (Strengths), and where are they lacking capital or efficiency (Weaknesses)? Your SWOT matrix should be designed in a way that clearly separates these internal factors from the external realities of the neighborhood (Opportunities) and the aggressive tactics of the competitor (Threats). Consider how they can use their local charm to counter the corporation's marketing budget, and justify your strategic layout.\n\nAs you develop your solution, pay attention to important design factors such as clear bullet points and actionable insights. A successful design should balance brutal honesty about the business's flaws with creative strategic vision for its survival.",
    referenceLinks: [
      { title: "Article: How to write a SWOT Analysis", url: "#" }
    ],
    downloadableFiles: [
      { fileName: "Coffee_Shop_Brief.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Design a Sustainable Facade",
    major: "Architecture",
    mentorName: "Khalid Hassan",
    mentorId: "60d5ecb8b394d2",
    tags: ["Artistic", "Investigative"],
    description: "Sketch a building exterior that maximizes winter sunlight but blocks summer heat.",
    difficulty: "Intermediate",
    timeEstimate: 35,
    whatYouWillLearn: [
      "Passive solar design.",
      "Climate-responsive architecture.",
      "Sun path geometry."
    ],
    whatYouWillDo: [
      "Review the solar angle data for the building's location.",
      "Sketch a south-facing window system with passive shading elements.",
      "Explain how the overhang blocks high summer sun but allows low winter sun."
    ],
    whatYouWillNeed: [
      "Drawing tools",
      "Basic understanding of angles"
    ],
    instructions: "Welcome to the Design Studio! Your task is to design an architectural facade capable of passively heating and cooling a building without relying on electricity. In this challenge, you will apply core architectural concepts such as passive solar geometry, climate responsiveness, shading devices, and sustainable materials to create a working solution. The goal is to sketch a window and overhang system that is 'smart' enough to block the harsh, high summer sun, while allowing the low, warm winter sun to flood into the room.\n\nYou should begin by analyzing the problem requirements carefully. Think about the changing trajectory of the sun throughout the year. Your exterior design should be designed in a way that uses physical geometry—like a precisely measured roof overhang or angled louvers—to cast shadows exactly when the building needs cooling. Consider the aesthetic impact of these functional elements on the building's exterior, and justify why your chosen dimensions achieve the perfect thermal balance.\n\nAs you develop your solution, pay attention to important design factors such as scale, orientation, and clear diagrammatic arrows showing the path of the sunbeams. A successful design should balance environmental engineering, geometric precision, and beautiful architectural form.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Solar_Angle_Data.pdf", fileUrl: "#" }
    ]
  },
  {
    title: "Map an E-Commerce Checkout Flow",
    major: "Management Information Systems",
    mentorName: "Khaled Al-Zahrani",
    mentorId: "60d5ecb8b396d1",
    tags: ["Investigative", "Conventional"],
    description: "Create a flowchart detailing what happens to data when a user clicks 'Buy Now'.",
    difficulty: "Intermediate",
    timeEstimate: 25,
    whatYouWillLearn: [
      "Systems mapping and architecture.",
      "API interactions in e-commerce.",
      "Process flow diagramming."
    ],
    whatYouWillDo: [
      "Identify the key systems involved (UI, Payment Gateway, Inventory DB).",
      "Draw a step-by-step flowchart tracking the data.",
      "Account for success and failure paths (e.g., declined card)."
    ],
    whatYouWillNeed: [
      "Flowchart tool (Draw.io, Lucidchart) or paper",
      "Logical sequencing skills"
    ],
    instructions: "Welcome to the Systems Architecture Lab! Your task is to design a digital process map capable of visualizing the invisible flow of data that powers modern online shopping. In this challenge, you will apply core Management Information Systems (MIS) concepts such as systems integration, API calls, logic gates, and data state changes to create a working solution. The goal is to create a comprehensive flowchart detailing exactly what happens behind the scenes the moment a customer clicks the 'Buy Now' button.\n\nYou should begin by analyzing the problem requirements carefully. Think about the sequence of events and the different servers involved: the frontend interface, the secure third-party payment gateway, and the company's internal inventory database. Your flowchart should be designed in a way that tracks the payload of data as it moves between these systems. Consider what logic loops need to exist to handle errors, such as a declined credit card or an item suddenly going out of stock, and justify your error-handling paths.\n\nAs you develop your solution, pay attention to important design factors such as standard flowchart shapes (diamonds for decisions, rectangles for processes) and clear directional arrows. A successful design should balance technical accuracy, logical completeness, and visual clarity.",
    referenceLinks: [],
    downloadableFiles: []
  },
  {
    title: "Identify Expense Anomalies",
    major: "Accounting",
    mentorName: "Mona Al-Dosari",
    mentorId: "60d5ecb8b397d2",
    tags: ["Conventional", "Enterprising"],
    description: "Review a travel expense report to flag items that violate company reimbursement policy.",
    difficulty: "Beginner",
    timeEstimate: 15,
    whatYouWillLearn: [
      "Corporate compliance and auditing.",
      "Policy enforcement.",
      "Professional communication."
    ],
    whatYouWillDo: [
      "Read the company's 1-page travel expense policy.",
      "Audit an employee's submitted receipt list.",
      "Flag the 3 items that violate the rules and write a brief rejection note."
    ],
    whatYouWillNeed: [
      "Attention to detail",
      "Word processor"
    ],
    instructions: "Welcome to the Audit and Compliance Lab! Your task is to design an internal audit capable of protecting corporate funds from misuse and ensuring strict adherence to company policy. In this challenge, you will apply core accounting concepts such as expense verification, regulatory compliance, internal controls, and professional communication to create a working solution. The goal is to act as the gatekeeper, reviewing a messy employee travel report to find the hidden charges that the company should not pay for.\n\nYou should begin by analyzing the problem requirements carefully. Think about the exact rules laid out in the corporate policy: perhaps there is a strict $50 daily limit on meals, or alcohol is explicitly non-reimbursable. Your auditing process should be designed in a way that cross-references every single receipt against these written rules. Consider the fact that the employee may have just made an honest mistake, and justify your rejections based purely on the documented policy.\n\nAs you develop your solution, pay attention to important design factors such as maintaining a professional, non-accusatory tone in your rejection note. A successful design should balance strict financial governance, sharp attention to detail, and tactful corporate communication.",
    referenceLinks: [],
    downloadableFiles: [
      { fileName: "Expense_Policy_and_Receipts.pdf", fileUrl: "#" }
    ]
  }
];


export const UNIVERSITIES = [
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

export const MAJORS = [
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
    role: 'guide',
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
    role: 'guide',
    university: 'KFUPM',
    major: 'Chemical Engineering',
    submittedDate: '2026-03-17',
    documentPreview: 'Transcript / ID / proof of enrollment preview.',
    status: 'Pending',
  },]
  export const mockFlaggedContent = [
    {
      id: 1,
      content: 'Calculator challenge has unclear instructions.',
      reportedBy: 'Sara Mohammed',
      reason: 'Misleading content',
      date: '2026-03-24',
      status: 'Pending',
    },
    {
      id: 2,
      content: 'Inappropriate comment on a challenge.',
      reportedBy: 'Reem Abdullah',
      reason: 'Inappropriate language',
      date: '2026-03-23',
      status: 'Pending',
    },
    {
      id: 3,
      content: 'Possible copied content in challenge description.',
      reportedBy: 'Dana Alsawad',
      reason: 'Plagiarism',
      date: '2026-03-22',
      status: 'Pending',
    },]
    export const mockAnnouncements = [
      {
        id: 1,
        title: 'Welcome to Meras',
        message: 'We are excited to have you on the platform.',
        targetAudience: 'All',
        status: 'Published',
        date: '2026-03-20',
      },
      {
        id: 2,
        title: 'Guide Verification Reminder',
        message: 'Please complete your verification process.',
        targetAudience: 'Guides',
        status: 'Draft',
        date: '2026-03-22',
      },
    ]

    export const mockGuideEarnings = [
      {
        id: 1,
        studentName: 'Sara Mohammed',
        sessionDate: '2026-03-10',
        duration: '30 mins',
        amount: 50,
      },
      {
        id: 2,
        studentName: 'Noura Salem',
        sessionDate: '2026-03-14',
        duration: '45 mins',
        amount: 75,
      },
      {
        id: 3,
        studentName: 'Faisal Ahmed',
        sessionDate: '2026-03-18',
        duration: '60 mins',
        amount: 100,
      },
      {
        id: 4,
        studentName: 'Reem Abdullah',
        sessionDate: '2026-03-22',
        duration: '30 mins',
        amount: 50,
      },
    ]
    export const mockOfficeHoursSlots = [
      { id: 1, day: 'Sunday', time: '9:00 AM', available: false },
      { id: 2, day: 'Sunday', time: '11:00 AM', available: false },
      { id: 3, day: 'Monday', time: '1:00 PM', available: false },
    ]

    export const mockCompletedChallenges = [
     mockChallenges[0],
     mockChallenges[1],
    ]