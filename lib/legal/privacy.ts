// Privacy Policy, verbatim from Figma frame 1:1496. This is legal copy: change
// the wording only with sign-off. Contents entries point at the closest
// section because Figma's list and section order differ.

import type { LegalDocument } from "@/lib/legal/types"

export const privacy: LegalDocument = {
  badge: "Legal",
  title: "Privacy & Policy",
  description:
    "Learn how Gym Udaan collects, uses, and protects your personal information.",
  toc: [
    { label: "01 Introduction", sectionId: "welcome" },
    { label: "02 Information We Collect", sectionId: "information" },
    { label: "03 How We Use Your Information", sectionId: "use" },
    { label: "04 Gym Member Data", sectionId: "account-management" },
    { label: "05 Data Storage & Security", sectionId: "security" },
    { label: "06 Data Sharing & Disclosure", sectionId: "sharing" },
    { label: "07 Third-Party Integrations", sectionId: "third-party" },
    { label: "08 Data Retention & Deletion", sectionId: "retention" },
    { label: "09 Your Privacy Rights", sectionId: "rights" },
    { label: "10 Children's Privacy", sectionId: "children" },
    { label: "11 Changes to This Policy", sectionId: "changes" },
  ],
  sections: [
    {
      id: "welcome",
      title: "Welcome to our Privacy & Policy",
      groups: [
        [
          {
            kind: "text",
            text: 'Welcome to Gym Udaan ("we," "our," or "us"). We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related web services.',
          },
          {
            kind: "text",
            text: "Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.",
          },
        ],
      ],
    },
    {
      id: "information",
      title: "Information We Collect",
      groups: [
        [
          { kind: "heading", text: "2.1 Personal Information" },
          {
            kind: "text",
            text: "We may collect personal information that you provide to us through your gym administrator, including but not limited to:",
          },
          {
            kind: "list",
            items: [
              "Name and contact information (email address, phone number)",
              "Account credentials (username and password - managed by administrators)",
              "Membership details and status",
              "Fitness and health-related information (if provided)",
              "Attendance and check-in records",
            ],
          },
        ],
        [
          { kind: "heading", text: "2.2 Automatically Collected Information" },
          {
            kind: "text",
            text: "When you use our application, we may automatically collect certain information, including:",
          },
          {
            kind: "list",
            items: [
              "Device information (device type, operating system, unique device identifiers)",
              "Usage data (features accessed, time spent on the app)",
              "Log data (IP address, access times, app crashes)",
            ],
          },
        ],
      ],
    },
    {
      id: "use",
      title: "How We Use Your Information",
      groups: [
        [
          {
            kind: "text",
            text: "We use the information we collect for the following purposes:",
          },
          {
            kind: "list",
            items: [
              "To create and manage your gym membership account (administered by gym staff)",
              "To provide, operate, and maintain our mobile application and services",
              "To process your membership fees and payments",
              "To track attendance and access to gym facilities",
              "To communicate with you about your membership, including updates and notifications",
              "To improve our services and user experience",
              "To monitor and analyze usage patterns and trends",
              "To detect, prevent, and address technical issues and security threats",
              "To comply with legal obligations",
            ],
          },
        ],
      ],
    },
    {
      id: "account-management",
      title: "Account Management",
      groups: [
        [
          {
            kind: "text",
            text: [
              { alert: "Important:" },
              " Gym Udaan operates on an administrator-managed model:",
            ],
          },
          {
            kind: "list",
            items: [
              "Account Creation: Members cannot create their own accounts. All accounts are created exclusively by authorized gym administrators.",
              "Password Management: Administrators have the authority to set and reset member passwords as needed.",
              "Account Modifications: Any changes to your account information must be requested through gym administrators.",
              "Account Deletion: Administrators have the authority to delete member accounts and associated data when membership is terminated or upon request.",
            ],
          },
        ],
      ],
    },
    {
      id: "sharing",
      title: "Data Sharing and Disclosure",
      groups: [
        [
          {
            kind: "text",
            text: "We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:",
          },
          {
            kind: "list",
            items: [
              "With Gym Administrators: Your information is accessible to authorized gym staff for account management purposes",
              "Service Providers: We may share data with third-party service providers who perform services on our behalf (e.g., payment processing, hosting)",
              "Legal Requirements: We may disclose your information if required by law or in response to valid legal requests",
              "Business Transfers: In connection with any merger, sale of company assets, or acquisition, your information may be transferred",
            ],
          },
        ],
      ],
    },
    {
      id: "security",
      title: "Data Security",
      groups: [
        [
          {
            kind: "text",
            text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
          },
        ],
      ],
    },
    {
      id: "retention",
      title: "Data Retention",
      groups: [
        [
          {
            kind: "text",
            text: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your membership is terminated or your account is deleted by an administrator, we will delete or anonymize your personal information within a reasonable timeframe, except where we are required to retain it for legal, accounting, or security purposes.",
          },
        ],
      ],
    },
    {
      id: "rights",
      title: "Your Rights",
      groups: [
        [
          {
            kind: "text",
            medium: true,
            text: "Depending on your location, you may have the following rights regarding your personal information:",
          },
          {
            kind: "list",
            medium: true,
            items: [
              "Access: Request access to the personal information we hold about you",
              "Correction: Request correction of inaccurate or incomplete information",
              "Deletion: Request deletion of your personal information (subject to legal obligations)",
              "Data Portability: Request a copy of your data in a structured, commonly used format",
              "Withdrawal of Consent: Where processing is based on consent, you may withdraw it at any time",
            ],
          },
          {
            kind: "text",
            medium: true,
            text: "To exercise these rights, please contact your gym administrator or reach out to us directly using the contact information provided below.",
          },
        ],
      ],
    },
    {
      id: "children",
      title: "Children's Privacy",
      groups: [
        [
          {
            kind: "text",
            medium: true,
            text: "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information.",
          },
        ],
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Links",
      groups: [
        [
          {
            kind: "text",
            text: "Our application may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information to them.",
          },
        ],
      ],
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      groups: [
        [
          {
            kind: "text",
            text: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Continued use of the application after changes constitutes acceptance of the updated policy.',
          },
        ],
      ],
    },
  ],
}
