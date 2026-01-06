import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

const faqItems = [
  {
    question: 'How do I contact customer support if I have a question or issue?',
    answer: 'You can reach our customer support team by emailing support@email.com or calling our toll-free number. We\'re here to assist you promptly.',
  },
  {
    question: 'Can I return the product if it doesn\'t meet my expectations?',
    answer: 'Absolutely! We offer a hassle-free return policy. If you\'re not completely satisfied, you can return the product within [number of days] days for a full refund or exchange.',
  },
  {
    question: 'What makes your product stand out from others in the market?',
    answer: 'Our product distinguishes itself through its adaptability, durability, and innovative features. We prioritize user satisfaction and continually strive to exceed expectations in every aspect.',
  },
  {
    question: 'Is there a warranty on the product, and what does it cover?',
    answer: 'Yes, our product comes with a [length of warranty] warranty. It covers defects in materials and workmanship. If you encounter any issues covered by the warranty, please contact our customer support for assistance.',
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

  const faqTitleSection = getSection('faq-title') || { id: 'faq-title', content: 'Frequently asked questions', type: 'heading' as const };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
      <Box sx={{ width: '100%' }}>
        {faqItems.map((item, index) => {
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
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}d-content`}
                id={`panel${index + 1}d-header`}
              >
                <EditableTextMUI
                  value={questionSection.content}
                  onSave={(value) => updateSectionContent(questionSection.id, value)}
                  variant="subtitle2"
                  sx={{ display: 'block' }}
                  hideEditButton={true}
                />
              </AccordionSummary>
              <AccordionDetails>
                <EditableTextMUI
                  value={answerSection.content}
                  onSave={(value) => updateSectionContent(answerSection.id, value)}
                  variant="body2"
                  multiline
                  sx={{ maxWidth: { sm: '100%', md: '70%' }, display: 'block' }}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Container>
  );
}
