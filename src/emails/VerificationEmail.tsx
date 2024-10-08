// import {
//     Body,
//     Button,
//     Container,
//     Head,
//     Html,
//     Preview,
//     Section,
//     Text,
//   } from '@react-email/components'
//   import * as React from 'react'
  
//   interface VerificationEmailProps {
//     verificationLink: string
//     userEmail: string
//   }
  
//   export default function VerificationEmail({
//     verificationLink,
//     userEmail,
//   }: VerificationEmailProps) {
//     return (
//       <Html>
//         <Head />
//         <Preview>Verify your email address</Preview>
//         <Body style={main}>
//           <Container style={container}>
//             <Section>
//               <Text style={title}>Verify your email address</Text>
//               <Text style={text}>
//                 Click the button below to verify your email address ({userEmail}).
//               </Text>
//               <Button style={button} href={verificationLink}>
//                 Verify Email Address
//               </Button>
//               <Text style={text}>
//                 If you didn't request this email, you can safely ignore it.
//               </Text>
//             </Section>
//           </Container>
//         </Body>
//       </Html>
//     )
//   }
  
//   const main = {
//     backgroundColor: '#f6f9fc',
//     fontFamily:
//       '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
//   }
  
//   const container = {
//     backgroundColor: '#ffffff',
//     border: '1px solid #f0f0f0',
//     borderRadius: '5px',
//     margin: '40px auto',
//     padding: '20px',
//     width: '465px',
//   }
  
//   const title = {
//     fontSize: '22px',
//     fontWeight: 'bold',
//     textAlign: 'center' as const,
//     margin: '30px 0',
//   }
  
//   const text = {
//     color: '#525252',
//     fontSize: '16px',
//     lineHeight: '24px',
//     textAlign: 'left' as const,
//   }
  
//   const button = {
//     backgroundColor: '#656ee8',
//     borderRadius: '5px',
//     color: '#fff',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     textDecoration: 'none',
//     textAlign: 'center' as const,
//     display: 'block',
//     width: '100%',
//     padding: '10px',
//     marginTop: '20px',
//     marginBottom: '20px',
//   }
  