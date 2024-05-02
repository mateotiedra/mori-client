import { Box, Container } from '@mui/material';

function SectionContainer({
  id,
  ref,
  maxWidth,
  sx,
  children,
  centered,
  fullPage,
  ...props
}) {
  return (
    <Container
      id={id}
      ref={ref}
      maxWidth={maxWidth || 'lg'}
      sx={{
        px: { xs: 4, sm: 5, md: 10, lg: 10, ...sx },
        display: 'flex',
        alignItems: fullPage && 'center',
        minHeight: fullPage && '100vh',
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: centered && 'center',
          my: fullPage && 12,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default SectionContainer;
