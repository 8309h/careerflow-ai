import Job from '../models/Job.js';

const jobs = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Astra Labs',
    logo: 'https://logo.clearbit.com/astralabs.com',
    category: 'Full Stack Developer',
    location: 'Remote',
    workMode: 'Remote',
    experienceLevel: 'Senior',
    employmentType: 'Full-time',
    salary: '$120k - $150k',
    skills: ['React', 'Node.js', 'GraphQL', 'AWS'],
    postedDate: new Date(),
    description: 'Lead the development of a modern product platform and mentor the engineering team.',
    responsibilities: ['Build web applications', 'Design API services', 'Collaborate with product'],
    requirements: ['5+ years experience', 'Strong JavaScript skills', 'Cloud deployment experience']
  },
  {
    title: 'Frontend Engineer',
    company: 'Nova Systems',
    logo: 'https://logo.clearbit.com/novasystems.com',
    category: 'Frontend Developer',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    experienceLevel: 'Mid',
    employmentType: 'Full-time',
    salary: '$95k - $115k',
    skills: ['React', 'TypeScript', 'CSS', 'Jest'],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    description: 'Create polished UI experiences for an enterprise SaaS product.',
    responsibilities: ['Implement responsive interfaces', 'Improve accessibility', 'Build reusable components'],
    requirements: ['3+ years frontend experience', 'Strong React knowledge', 'UI/UX focus']
  },
  {
    title: 'AI Engineer',
    company: 'Pulse Intelligence',
    logo: 'https://logo.clearbit.com/pulseintelligence.ai',
    category: 'AI Engineer',
    location: 'New York, NY',
    workMode: 'Onsite',
    experienceLevel: 'Mid',
    employmentType: 'Full-time',
    salary: '$110k - $140k',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'NLP'],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    description: 'Build AI-powered solutions that analyze unstructured data for enterprise customers.',
    responsibilities: ['Train models', 'Deploy pipelines', 'Optimize AI workflows'],
    requirements: ['ML experience', 'Data science background', 'Strong Python skills']
  },
  {
    title: 'MERN Stack Developer Intern',
    company: 'LaunchHub',
    logo: 'https://logo.clearbit.com/launchhub.io',
    category: 'Internship',
    location: 'Remote',
    workMode: 'Remote',
    experienceLevel: 'Internship',
    employmentType: 'Internship',
    salary: '$22/hr',
    skills: ['JavaScript', 'MongoDB', 'Express', 'React'],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
    description: 'Join a startup team and help build customer-facing products with the MERN stack.',
    responsibilities: ['Support development', 'Write tests', 'Participate in team planning'],
    requirements: ['Currently enrolled in a degree program', 'Passion for web development']
  }
];

const seedJobs = async () => {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      await Job.insertMany(jobs);
      console.log('[Seed Jobs] Seeded default jobs');
    }
  } catch (error) {
    error.context = 'Seed Jobs Error';
    throw error;
  }
};

export default seedJobs;
