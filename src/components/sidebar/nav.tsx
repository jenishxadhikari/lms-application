import {
  AudioLinesIcon,
  AwardIcon,
  BookOpenIcon,
  Building2Icon,
  ClipboardListIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  MailPlusIcon,
  MegaphoneIcon,
  NewspaperIcon,
  PackageIcon,
  PresentationIcon,
  Settings2Icon,
  StoreIcon,
  TerminalIcon,
  UsersIcon,
} from "lucide-react"

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      label: "Super Admin",
      items: [
        {
          title: "Dashboard",
          url: "/superadmin/dashboard",
          icon: <LayoutDashboardIcon />,
        },
        {
          title: "Organization",
          url: "/superadmin/organization",
          icon: <Building2Icon />,
        },
        {
          title: "Domains",
          url: "/superadmin/domain",
          icon: <GlobeIcon />,
        },
        {
          title: "Plans",
          url: "/superadmin/plan",
          icon: <CreditCardIcon />,
        },
        {
          title: "Invites",
          url: "/superadmin/invite",
          icon: <MailPlusIcon />,
        },
      ],
    },
    {
      label: "Organization",
      items: [
        {
          title: "Organization Settings",
          url: "#",
          icon: <Settings2Icon />,
          items: [
            {
              title: "Branding",
              url: "/organization/branding",
            },
            {
              title: "Assign a Course",
              url: "/organization/assign-course",
            },
            {
              title: "Invite to Organization",
              url: "/organization/invite",
            },
            {
              title: "Users",
              url: "/organization/users",
            },
            {
              title: "Roles & Permissions",
              url: "/organization/roles-permissions",
            },
          ],
        },
        {
          title: "Course",
          url: "#",
          icon: <BookOpenIcon />,
          items: [
            {
              title: "List Course",
              url: "/superadmin/course",
            },
            {
              title: "List Category",
              url: "/superadmin/course-category",
            },
            {
              title: "Course Analytics",
              url: "/superadmin/course-analytics",
            },
          ],
        },
        {
          title: "Workshop",
          url: "#",
          icon: <PresentationIcon />,
          items: [
            {
              title: "List Workshop",
              url: "/superadmin/workshop",
            },
            {
              title: "Workshop Analytics",
              url: "/superadmin/workshop-analytics",
            },
          ],
        },
        {
          title: "Mentorship",
          url: "#",
          icon: <UsersIcon />,
          items: [
            {
              title: "List Mentorship",
              url: "/superadmin/mentorship",
            },
            {
              title: "Mentorship Analytics",
              url: "/superadmin/mentorship-analytics",
            },
          ],
        },
        {
          title: "Bundle Management",
          url: "/superadmin/bundle-management",
          icon: <PackageIcon />,
        },
        {
          title: "Assignment",
          url: "/superadmin/assignment",
          icon: <ClipboardListIcon />,
        },
        {
          title: "Certificate",
          url: "#",
          icon: <AwardIcon />,
          items: [
            {
              title: "List Certificate",
              url: "/superadmin/certificate",
            },
            {
              title: "Certificate Setting",
              url: "/superadmin/certificate-setting",
            },
            {
              title: "Certificate Designer",
              url: "/superadmin/certificate-designer",
            },
          ],
        },
        {
          title: "Article",
          url: "#",
          icon: <NewspaperIcon />,
          items: [
            {
              title: "All Article",
              url: "/superadmin/article",
            },
            {
              title: "Article Category",
              url: "/superadmin/article-category",
            },
            {
              title: "Article Analytics",
              url: "/superadmin/article-analytics",
            },
          ],
        },
      ],
    },
    {
      label: "Store",
      items: [
        {
          title: "Store",
          url: "#",
          icon: <StoreIcon />,
          items: [
            {
              title: "Dashboard",
              url: "/superadmin/store-dashboard",
            },
            {
              title: "Products",
              url: "/superadmin/store-products",
            },
            {
              title: "Orders",
              url: "/superadmin/store-orders",
            },
            {
              title: "Store Category",
              url: "/superadmin/store-category",
            },
            {
              title: "Reviews & Comments",
              url: "/superadmin/store-reviews",
            },
          ],
        },
      ],
    },
    {
      label: "Marketing",
      items: [
        {
          title: "Marketing",
          url: "#",
          icon: <MegaphoneIcon />,
          items: [
            {
              title: "Campaigns",
              url: "/superadmin/marketing-campaigns",
            },
            {
              title: "Affiliate Link",
              url: "/superadmin/marketing-affiliate",
            },
            {
              title: "Promo & Coupons",
              url: "/superadmin/marketing-promo",
            },
            {
              title: "Email & SMS",
              url: "/superadmin/marketing-email-sms",
            },
          ],
        },
      ],
    },
    {
      label: "Support",
      items: [
        {
          title: "Support",
          url: "#",
          icon: <LifeBuoyIcon />,
          items: [
            {
              title: "Tickets",
              url: "/superadmin/support-tickets",
            },
            {
              title: "Help Center",
              url: "/superadmin/support-help-center",
            },
          ],
        },
      ],
    },
  ],
}
