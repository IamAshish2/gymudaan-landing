// Terms & Conditions, verbatim from Figma frame 1:1409. This is legal copy:
// change the wording only with sign-off.

import type { LegalDocument } from "@/lib/legal/types"
import { ROUTES } from "@/lib/routes"

const privacyLink = { link: "Privacy Policy", href: ROUTES.legal.privacy }

export const terms: LegalDocument = {
  badge: "Legal",
  title: "Terms & Conditions",
  description:
    "Understand the terms that govern your use of Gym Udaan and our services.",
  toc: [
    { label: "01 Introduction", sectionId: "welcome" },
    { label: "02 Acceptance & Eligibility", sectionId: "acceptance" },
    { label: "03 Our Services", sectionId: "service" },
    { label: "04 Third-Party Integrations", sectionId: "third-party" },
    { label: "05 Content & Ownership", sectionId: "content" },
    { label: "06 Acceptable Use", sectionId: "acceptable-use" },
    { label: "07 Subscriptions & Billing", sectionId: "billing" },
    { label: "08 Account Termination", sectionId: "termination" },
    { label: "09 Service Disclaimer", sectionId: "disclaimer" },
    { label: "10 Liability & Indemnity", sectionId: "liability" },
    { label: "11 Governing Law & Disputes", sectionId: "governing-law" },
    { label: "12 Changes to Terms", sectionId: "changes" },
  ],
  sections: [
    {
      id: "welcome",
      title: "Welcome to our Terms and Conditions",
      groups: [
        [
          {
            kind: "text",
            text: "These Terms of Service (the “Terms”) are a binding agreement between you and Udaan Tech Solution Pvt. Ltd. (“we,” “us,” or “our”), the company that operates GymUdaan. They govern your use of the GymUdaan application, website, and related services (collectively, the “Service”).",
          },
        ],
        [
          {
            kind: "text",
            text: [
              "Please read these Terms carefully. How we handle your information is described in our ",
              privacyLink,
              ", which forms part of these Terms.",
            ],
          },
        ],
      ],
    },
    {
      id: "acceptance",
      title: "Acceptance of Terms and Eligibility",
      groups: [
        [
          {
            kind: "text",
            text: "By creating an account, connecting a third-party account, or otherwise accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.",
          },
          { kind: "text", text: "To use the Service, you must:" },
          {
            kind: "list",
            items: [
              "Be at least 18 years old",
              "Be legally able to enter into a binding contract",
              "Not be barred from using the Service under any applicable law",
            ],
          },
          {
            kind: "text",
            text: "If you use the Service on behalf of a gym, business, or other organisation, you confirm that you are authorised to accept these Terms on its behalf, and “you” refers to that organisation as well as to you",
          },
        ],
      ],
    },
    {
      id: "service",
      title: "Description of the Service",
      groups: [
        [
          {
            kind: "text",
            text: "GymUdaan is a software-as-a-service platform for gyms and fitness businesses. Depending on your plan, the Service includes:",
          },
          { kind: "text", text: "Gym Management" },
          {
            kind: "list",
            items: [
              "Managing branches, staff, plans, facilities, and finances",
              "Billing, payments, reports, and business records",
            ],
          },
          { kind: "text", text: "Member Tracking" },
          {
            kind: "list",
            items: [
              "Member registration and profiles",
              "Attendance tracking",
              "Subscriptions, renewals, and expiry reminders",
            ],
          },
          { kind: "text", text: "Social Media Automation" },
          {
            kind: "list",
            items: [
              "Scheduling and publishing posts to connected Facebook Pages, Instagram accounts, and TikTok accounts",
              "Viewing and replying to comments and messages on connected accounts",
              "Viewing insights and engagement information for connected accounts",
            ],
          },
          {
            kind: "text",
            text: "We may add, change, or remove features from time to time to improve the Service.",
          },
        ],
      ],
    },
    {
      id: "account",
      title: "Account Registration and Security",
      groups: [
        [
          {
            kind: "text",
            text: "To use most features, you must register for an account. You agree to:",
          },
          {
            kind: "list",
            items: [
              "Provide accurate, current, and complete information, and keep it up to date",
              "Keep your password and login credentials confidential",
              "Not share your account with, or transfer it to, anyone else",
              "Make sure your staff users keep their own credentials secure",
              "Notify us promptly at the contact email below if you suspect unauthorised use of your account",
            ],
          },
          {
            kind: "text",
            text: "You are responsible for all activity that happens under your account, including activity by staff users you create. We are not liable for any loss caused by unauthorised use of your credentials.",
          },
        ],
      ],
    },
    {
      id: "third-party",
      title: "Connecting Third-Party Platforms",
      groups: [
        [
          {
            kind: "text",
            text: "The Service lets you connect accounts you own or manage on Meta platforms (Facebook and Instagram) and on TikTok.",
          },
        ],
        [{ kind: "heading", text: "Authorization to Act on Your Behalf" }],
        [
          {
            kind: "text",
            text: "When you connect an account, you authorize GymUdaan to access it and to act on your behalf, within the permissions you grant during the platform’s authorization process. This includes publishing the content you schedule, and reading and replying to comments and messages when you ask us to.",
          },
        ],
        [
          {
            kind: "text",
            medium: true,
            text: "We act on your connected accounts only to carry out the features you use and the actions you request or schedule.",
          },
        ],
        [{ kind: "heading", text: "Platform Terms Also Apply" }],
        [
          {
            kind: "text",
            text: "Your use of each connected platform is also governed by that platform’s own terms and policies. You agree to comply with them.",
          },
        ],
        [
          { kind: "heading", text: "Meta (Facebook and Instagram)" },
          {
            kind: "text",
            text: [
              "Use of Facebook and Instagram through GymUdaan is subject to Meta’s ",
              {
                link: "Terms of Service",
                href: "https://www.facebook.com/terms.php",
              },
              ", the ",
              {
                link: "Instagram Terms of Use",
                href: "https://help.instagram.com/581066165581870",
              },
              ", and the ",
              {
                link: "Meta Platform Terms",
                href: "https://developers.facebook.com/terms/",
              },
              ".",
            ],
          },
        ],
        [
          { kind: "heading", text: "TikTok" },
          {
            kind: "text",
            text: [
              "Use of TikTok through GymUdaan is subject to the ",
              {
                link: "TikTok Terms of Service",
                href: "https://www.tiktok.com/legal/terms-of-service",
              },
              " and TikTok’s Community Guidelines.",
            ],
          },
        ],
        [
          { kind: "heading", text: "Revoking Access" },
          {
            kind: "text",
            text: "You can revoke GymUdaan’s access at any time by:",
          },
          {
            kind: "list",
            items: [
              "Disconnecting the account from the social media settings inside GymUdaan",
              "Removing GymUdaan from the connected apps or business integrations section of your Facebook, Instagram, or TikTok settings",
            ],
          },
        ],
        [
          {
            kind: "text",
            text: [
              "Once access is revoked, we stop acting on that account, and any scheduled posts for it will not be published. We delete the access tokens for that account and stop storing data retrieved from it. For how associated data is deleted, see our ",
              privacyLink,
              ".",
            ],
          },
          { kind: "text", text: "Platform Availability" },
          {
            kind: "text",
            text: "Third-party platforms are outside our control. They may change their APIs, permissions, or policies, or restrict access, and this may limit or interrupt some features. We are not responsible for the availability or actions of these platforms.",
          },
        ],
      ],
    },
    {
      id: "content",
      title: "Your Content",
      groups: [
        [
          {
            kind: "text",
            text: "“User Content” means the text, images, videos, captions, messages, member records, and other material you upload, create, or send through the Service.",
          },
        ],
        [
          { kind: "heading", text: "Ownership" },
          {
            kind: "text",
            text: "You keep all ownership rights to your User Content. We do not claim ownership of it.",
          },
        ],
        [
          { kind: "heading", text: "License You Grant Us" },
          {
            kind: "text",
            text: "You grant us a limited, non-exclusive, worldwide, royalty-free, revocable licence to host, store, copy, process, and format your User Content solely to operate the Service for you. This includes publishing it on your behalf to the accounts you connect, at the times you choose.",
          },
        ],
        [
          {
            kind: "text",
            text: "We do not use your User Content to advertise GymUdaan, and we do not publish it anywhere you have not directed us to.",
          },
          {
            kind: "text",
            text: "This license ends when you delete the User Content or your account. We may keep backup copies for a limited time, or copies that the law requires us to keep.",
          },
        ],
        [
          { kind: "heading", text: "Your Responsibility" },
          {
            kind: "text",
            text: "You confirm that you own or have the necessary rights, licenses, and consents for all User Content you submit, including consent from people who appear in photos or videos and from members whose data you record. You are solely responsible for your User Content and for what is published on your accounts through the Service.",
          },
        ],
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      groups: [
        [
          { kind: "text", text: "You agree not to use the Service to:" },
          {
            kind: "list",
            items: [
              "Send spam, unsolicited bulk messages, or automated messages that recipients have not agreed to receive",
              "Publish or send unlawful, fraudulent, defamatory, obscene, hateful, harassing, or misleading content",
              "Infringe anyone's intellectual property, privacy, or other rights",
              "Violate the terms, community guidelines, or developer policies of Meta, Instagram, TikTok, or any other connected platform, including their rules on messaging and automation",
              "Artificially inflate engagement, or impersonate any person or business",
              "Use the Service to send promotional or marketing messages to people who have not opted in to receive them",
              "Collect or harvest other people's data without permission",
              "Upload malware, or interfere with or disrupt the Service or its infrastructure",
              "Access the Service by automated means, or attempt to bypass its security or usage limits",
              "Reverse-engineer, copy, resell, or sublicense the Service without our written permission",
            ],
          },
          {
            kind: "text",
            text: "We may remove content, cancel scheduled posts, or suspend features or accounts that we reasonably believe break these rules.",
          },
        ],
      ],
    },
    {
      id: "billing",
      title: "Subscription, Billing, and Cancellation",
      groups: [
        [
          { kind: "heading", text: "Plans and Fees" },
          {
            kind: "text",
            text: [
              "Paid features are offered on a subscription basis. Current plans and prices are listed on our ",
              { link: "Plans page", href: ROUTES.pricing },
              ". Fees are payable in advance for each billing period and exclude applicable taxes, which you are responsible for.",
            ],
          },
        ],
        [
          { kind: "heading", text: "Renewal and Non-Payment" },
          {
            kind: "text",
            text: "Your subscription must be renewed before the end of each billing period to keep access to paid features. If payment is not received, we may limit or suspend your access until it is.",
          },
        ],
        [
          { kind: "heading", text: "Price Changes" },
          {
            kind: "text",
            text: "We may change our prices. Price changes apply from your next billing period, and we will notify you in advance.",
          },
        ],
        [
          { kind: "heading", text: "Cancellation and Refunds" },
          {
            kind: "text",
            text: "You can cancel at any time. Cancellation takes effect at the end of your current billing period, and you keep access until then. Fees already paid are non-refundable, including for partial periods, unless the law requires otherwise.",
          },
        ],
      ],
    },
    {
      id: "termination",
      title: "Termination",
      groups: [
        [
          { kind: "heading", text: "By You" },
          {
            kind: "text",
            text: "You may stop using the Service, cancel your subscription, or ask us to delete your account at any time.",
          },
        ],
        [
          { kind: "heading", text: "By Us" },
          {
            kind: "text",
            text: "We may suspend or terminate your access, with or without notice, if:",
          },
          {
            kind: "list",
            items: [
              "You breach these Terms or a connected platform's policies",
              "Your fees remain unpaid",
              "We are required to do so by law or by a connected platform",
              "Your use creates security, legal, or reputational risk for us or others",
            ],
          },
          {
            kind: "text",
            text: "We may also discontinue the Service as a whole with reasonable advance notice.",
          },
        ],
        [
          { kind: "heading", text: "Effect of Termination" },
          {
            kind: "text",
            text: [
              "When your account is terminated, your right to use the Service ends, scheduled posts are cancelled, and we revoke our access tokens for your connected accounts. Your data is handled as described in our ",
              privacyLink,
              ". Sections that by their nature should survive termination, including sections 9 to 11, remain in effect.",
            ],
          },
        ],
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      groups: [
        [
          {
            kind: "text",
            text: "The Service is provided “as is” and “as available.” To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.",
          },
          { kind: "text", text: "We do not guarantee that:" },
          {
            kind: "list",
            items: [
              "The Service will be uninterrupted, secure, or error-free",
              "Scheduled posts or messages will be delivered at an exact time, or at all, particularly where a third-party platform is unavailable or rejects them",
              "Any particular results will come from using the Service, including audience growth or engagement",
            ],
          },
          {
            kind: "text",
            text: "You are responsible for keeping your own copies of important business data.",
          },
        ],
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      groups: [
        [
          {
            kind: "text",
            text: "To the fullest extent permitted by law, Udaan Tech Solution Pvt. Ltd. and its directors, employees, and partners are not liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits, revenue, data, or goodwill, arising from your use of or inability to use the Service.",
          },
          {
            kind: "text",
            text: "We are not liable for the acts, omissions, outages, or policy decisions of third-party platforms, including Meta and TikTok, or for actions they take against your accounts.",
          },
          {
            kind: "text",
            text: "Our total liability for all claims relating to the Service will not exceed the fees you paid us in the twelve (12) months before the event that gave rise to the claim.",
          },
        ],
        [
          { kind: "heading", text: "Indemnity" },
          {
            kind: "text",
            text: "You agree to indemnify and hold us harmless from any claims, losses, and expenses, including reasonable legal fees, arising from your User Content, your use of the Service, or your breach of these Terms or of any third-party platform’s terms.",
          },
        ],
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      groups: [
        [
          {
            kind: "text",
            text: "These Terms are governed by the laws of Nepal. Subject to applicable law, the courts of Sunsari District, Nepal have exclusive jurisdiction over any dispute arising from these Terms or the Service.",
          },
          {
            kind: "text",
            text: [
              "Before starting formal proceedings, please contact us at ",
              {
                link: "info@udaantechsolution.com",
                href: "mailto:info@udaantechsolution.com",
              },
              " so that we can try to resolve the issue informally.",
            ],
          },
        ],
      ],
    },
    {
      id: "changes",
      title: "Changes to These Terms",
      groups: [
        [
          {
            kind: "text",
            text: "We may update these Terms from time to time to reflect changes to the Service, to the law, or to the policies of connected platforms.",
          },
          { kind: "text", text: "When we make changes, we will:" },
          {
            kind: "list",
            items: [
              "Update the “Last Updated” date at the top of this page",
              "For material changes, notify you by email or with a notice inside the application before the changes take effect",
            ],
          },
          {
            kind: "text",
            text: "If you keep using the Service after the changes take effect, you accept the updated Terms. If you do not agree to them, stop using the Service and cancel your subscription.",
          },
        ],
      ],
    },
  ],
}
