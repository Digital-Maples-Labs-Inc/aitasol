import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

const faqItems = [
  {
    question: 'What does AitaSol Solutions Educational Consultancy do?',
    answer: 'We provide guidance and support to students exploring international education opportunities. Our services include program and institution selection, application support, admissions documentation guidance, scholarship and funding information, career counselling, and pre-arrival support.',
  },
  {
    question: 'Do you guarantee admission, visas, or scholarships?',
    answer: 'No. We do not guarantee admissions, visas, funding, or employment outcomes. All decisions are made independently by institutions, immigration authorities, and funding providers. Our role is to guide students accurately and ethically.',
  },
  {
    question: 'Which countries do you help students apply to?',
    answer: 'We support students applying to a range of international destinations depending on eligibility, program availability, and institutional requirements. Options are discussed during consultation based on individual circumstances.',
  },
  {
    question: 'How do you help students choose the right program or school?',
    answer: 'We assess academic background, language proficiency, career goals, financial readiness, and long-term plans. Recommendations are based on suitability and readiness, not pressure to apply quickly.',
  },
  {
    question: 'Can you apply on my behalf?',
    answer: 'Yes. Aitah Solutions Educational Consultancy works through shared-access application platforms such as ApplyBoard and Passage. This means both the student and our advisors can access the application account. Depending on your preference, you may upload documents directly yourself, or share documents with us so we upload them on your behalf. With your authorization, we can complete and submit applications through these platforms while you retain full visibility and access at all times. For students applying for education funding, we also assist with Passage loan applications through the Passage platform, based on the information and documents you provide. Students remain responsible for the accuracy and authenticity of all submitted information. Admissions and funding decisions are made independently by institutions and funding providers.',
  },
  {
    question: 'Do you help with Statements of Purpose (SOPs) and CVs?',
    answer: 'Yes. We guide and review admissions documents such as SOPs and CVs to ensure clarity, accuracy, and alignment with institutional expectations. We do not fabricate or misrepresent information.',
  },
  {
    question: 'What if I don\'t meet the requirements yet?',
    answer: 'If a student is not ready to apply, we provide honest feedback and may recommend alternative steps such as upgrading qualifications, improving language proficiency, or gaining experience before applying.',
  },
  {
    question: 'Do you offer immigration advice?',
    answer: 'No. We do not provide immigration or legal advice. Where immigration support is required, we refer students to licensed and authorized immigration professionals.',
  },
  {
    question: 'Are you partnered with education platforms or institutions?',
    answer: 'Yes. We work with established education platforms and institutional partners to support application processes. These partnerships do not influence admissions decisions or guarantee outcomes.',
  },
  {
    question: 'Do your services cost money?',
    answer: 'Some services may involve consultation or service fees, depending on the type and level of support required. Any applicable fees are explained transparently before services begin.',
  },
  {
    question: 'Do you help with scholarships and funding?',
    answer: 'We provide guidance on available scholarships and funding options, including eligibility criteria and application processes. Scholarships and funding are competitive and not guaranteed.',
  },
  {
    question: 'Can you help after I receive an offer letter?',
    answer: 'Yes. We assist students in understanding offer conditions, deadlines, next steps, and pre-departure preparation once an offer is received.',
  },
  {
    question: 'Do you support students after arrival?',
    answer: 'We offer pre-arrival guidance and may assist with arrival coordination, such as airport pick-up where available. Ongoing settlement support varies and is discussed during consultation.',
  },
  {
    question: 'How long does the application process take?',
    answer: 'Timelines vary depending on the institution, program, intake, and student readiness. We provide realistic timelines during consultation, but processing times are outside our control.',
  },
  {
    question: 'How do I get started with AitaSol?',
    answer: 'You can book a consultation through our website or contact us directly. The initial consultation helps assess eligibility, goals, and next steps before any application decisions are made.',
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const { page, loading, getSection, updateSectionContent } = usePageData('home');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(
        isExpanded
          ? [...expanded, panel]
          : expanded.filter((item) => item !== panel),
      );
    };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const faqTitleSection = getSection('faq-title') || { id: 'faq-title', content: 'Frequently Asked Questions', type: 'heading' as const };

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <EditableTextMUI
        value={faqTitleSection.content}
        onSave={(value) => updateSectionContent(faqTitleSection.id, value)}
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
          display: 'block',
        }}
      />
      <Box sx={{ width: '100%', maxWidth: '900px' }}>
        {/* Show only first 4 FAQs on homepage */}
        {faqItems.slice(0, 4).map((item, index) => {
          const questionSection = getSection(`faq-${index + 1}-question`) || {
            id: `faq-${index + 1}-question`,
            content: item.question,
            type: 'heading' as const
          };
          const answerSection = getSection(`faq-${index + 1}-answer`) || {
            id: `faq-${index + 1}-answer`,
            content: item.answer,
            type: 'paragraph' as const
          };
          return (
            <Accordion
              key={index}
              expanded={expanded.includes(`panel${index + 1}`)}
              onChange={handleChange(`panel${index + 1}`)}
              sx={{
                mb: 2,
                borderRadius: '16px !important',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                overflow: 'hidden',
                '&:before': { display: 'none' }, // Remove default MUI separator
                backgroundColor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  borderColor: 'primary.main',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}d-content`}
                id={`panel${index + 1}d-header`}
                sx={{
                  fontWeight: 600,
                  '&.Mui-expanded': {
                    minHeight: 48,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }
                }}
              >
                <EditableTextMUI
                  value={questionSection.content}
                  onSave={(value) => updateSectionContent(questionSection.id, value)}
                  variant="subtitle1"
                  sx={{ display: 'block', fontWeight: 600, fontSize: '1rem' }}
                  hideEditButton={true}
                />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <EditableTextMUI
                  value={answerSection.content}
                  onSave={(value) => updateSectionContent(answerSection.id, value)}
                  variant="body2"
                  multiline
                  sx={{ display: 'block', lineHeight: 1.7, color: 'text.secondary' }}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}

        {/* Link to full FAQ page */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigateTo('/faq')}
            sx={{
              mt: 2,
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              }
            }}
          >
            View All FAQs
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
