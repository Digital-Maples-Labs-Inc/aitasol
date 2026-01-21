
export interface ServiceData {
    title: string;
    subtitle: string;
    contentTitle: string;
    content1: string;
    content2: string;
    imageUrl?: string;
}

export const servicesData: Record<string, ServiceData> = {
    'program-selection': {
        title: 'Program and Institution Selection Services',
        subtitle: 'Comprehensive guidance to identify academic options aligning with your goals.',
        contentTitle: 'Structured Selection Process',
        content1: 'AitahSolutions Educational Consultancy provides structured program and institution selection services designed to support students in identifying academic options that align with their educational background, career objectives, financial capacity, and long-term plans. This service is grounded in the understanding that poor program selection is one of the leading causes of academic failure, financial strain, and immigration challenges for international students.\n\nOur process begins with a comprehensive student assessment, which includes academic history, prior qualifications, language proficiency, professional experience (where applicable), financial preparedness, and post-study goals. Rather than promoting a narrow set of institutions, we guide students through a broad analysis of available options while explaining entry requirements, competitiveness, tuition ranges, program duration, and study outcomes.',
        content2: 'We assist students in understanding the differences between universities, colleges, pathway programs, and graduate certificates, clarifying how each option may impact employability and further education opportunities. Where relevant, we also explain institutional reputation, accreditation status, intake cycles, and academic expectations.\n\nWe also help students compare multiple offers, explaining conditional versus unconditional admissions, progression requirements, and realistic timelines. Throughout this process, students are encouraged to ask questions and actively participate in decision-making rather than passively accepting recommendations. This service is advisory in nature and does not involve decision-making authority over admissions outcomes. Final choices remain with the student, supported by clear, accurate, and transparent information.',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070'
    },
    'application-support': {
        title: 'Application Process Support',
        subtitle: 'Seamless navigation through administrative requirements and deadlines.',
        contentTitle: 'Navigating Applications',
        content1: 'AitahSolutions Educational Consultancy provides application process support to assist students in navigating the administrative and procedural requirements of applying to international education institutions. This service is designed to reduce errors, missed deadlines, and misinterpretation of requirements while preserving the student’s ownership of their application.',
        content2: 'Our role includes explaining institutional application procedures, intake timelines, documentation requirements, and submission processes. We assist students in organizing required materials, understanding conditional offers, and tracking application progress. We emphasize accuracy and consistency, as discrepancies can lead to complications. This service prioritizes clarity, organization, and compliance.',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070'
    },
    'admissions-docs': {
        title: 'Admissions Documentation',
        subtitle: 'Expert assistance in crafting High-quality SOPs, CVs, and transcripts.',
        contentTitle: 'Documentation Excellence',
        content1: 'Admissions documentation is a critical component of successful applications, and AitahSolutions Educational Consultancy provides structured support to help students prepare documents that meet institutional expectations while accurately representing their academic and personal history.',
        content2: 'We assist students in understanding the purpose and structure of key documents such as Statements of Purpose, letters of intent, CVs/resumés, and academic transcripts. Our approach focuses on clarity, honesty, and relevance rather than exaggerated claims. We also provide document review services to identify issues related to formatting, clarity, tone, and completeness.',
        imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070'
    },
    'scholarships': {
        title: 'Scholarships & Funding',
        subtitle: 'Financial planning guidance to make your education affordable.',
        contentTitle: 'Funding Your Future',
        content1: 'AitahSolutions Educational Consultancy provides guidance on scholarships, institutional funding options, and education-related financial planning. This service is informational and advisory, recognizing that funding opportunities are competitive and subject to independent assessment.',
        content2: 'We assist students in identifying scholarships offered by institutions and recognized organizations, explaining eligibility criteria and application timelines. For students exploring education financing options, we provide general information on eligibility considerations and repayment awareness. This service emphasizes realistic financial planning and understanding the full cost of study.',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072'
    },
    'career-pathway': {
        title: 'Career Counselling',
        subtitle: 'Aligning your education choices with long-term employability.',
        contentTitle: 'Planning Your Success',
        content1: 'Career counselling at AitahSolutions Educational Consultancy focuses on aligning education choices with long-term employability and personal capacity. Students are guided through structured discussions about career interests, market trends, transferable skills, and realistic outcomes of chosen programs.',
        content2: 'We assist students in understanding how different qualifications may impact employment opportunities and further study pathways, without guaranteeing job outcomes. This service supports informed decision-making rather than prescriptive career direction, ensuring your educational investment yields the best possible career returns.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070'
    },
    'immigration-support': {
        title: 'Immigration & Pre-Arrival',
        subtitle: 'Trusted referrals and support for a smooth transition to Canada.',
        contentTitle: 'Smooth Transition',
        content1: 'We connect students with trusted, licensed immigration consultants for immigration-related matters and provide pre-arrival guidance such as travel preparation and arrival coordination, including airport pick-up where available.',
        content2: 'Immigration advice is not provided directly by AitahSolutions, but our pre-arrival support ensures you are prepared for landing. From housing tips to understanding initial settlement needs, we guide you through the logistics of moving to a new country so you can focus on your studies from day one.',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021'
    }
};
