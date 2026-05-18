import type { PublicDepartmentProfile } from "@/types/department";

export const mockDepartments: PublicDepartmentProfile[] = [
  {
    id: "department_1",
    departmentName: "Westview Police Department",
    slug: "westview-police-department",
    accountStatus: "active",
    approvalStatus: "active",
    tier: "medium",
    city: "Westview",
    state: "MA",
    zipCode: "02000",
    websiteUrl: "https://example.gov",
    mainPhone: "(617) 555-0101",
    logoUrl: "https://placehold.co/160x160/0a2a55/f5b82e?text=WPD",
    coverImageUrl: "https://images.unsplash.com/photo-1575908539614-ff89490f4a78?auto=format&fit=crop&w=1200&q=80",
    badgeImageUrl: "https://placehold.co/220x220/0a2a55/f5b82e?text=Westview%0APolice",
    primaryAdminUserId: "user_department_admin_1",
    badgeCreditsRemaining: 18,
    badgeCreditsSent: 2,
    profileIntro: "A community-focused department committed to integrity, professionalism, and making Westview a safe place to live, work, and visit.",
    activeJobCount: 4,
    departmentType: "Civil Service",
    hiringTimeline: "Within 3 Months",
    openPositions: "3 - 4 Officers",
    chiefName: "James Smith",
    chiefSwornIn: "Jan 10, 2020",
    population: "11,600 Residents",
    departmentSize: "50 - 60",
    patrolOfficers: "20 - 30",
    callVolume: "Moderate",
    communityType: "Residential, Urban",
    whyJoin: ["Supportive leadership", "Strong community partnerships", "Modern equipment and technology", "Opportunities for advancement", "Work-life balance"],
    media: [
      "https://images.unsplash.com/photo-1575908539614-ff89490f4a78?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80"
    ],
    sections: [
      {
        id: "westview_inside",
        title: "Inside the Department",
        summary: "Modernized station operations with collaborative patrol teams, updated facilities, and wellness support.",
        highlights: [
          { label: "Age of Station", value: "25+ years, modernized in 2021" },
          { label: "Station Amenities", value: "Work-out facility, showers, break rooms, outdoor areas" },
          { label: "On-Site Mental Health Clinician", value: "Yes" }
        ]
      },
      {
        id: "westview_training",
        title: "Training & Growth",
        summary: "In-service training, leadership development, and specialty assignment pathways for motivated candidates.",
        highlights: [
          { label: "Specialty Units", value: "K-9, detective, SWAT, community policing" },
          { label: "Preferred Academy Location", value: "MPTC or regional partner academies" }
        ]
      },
      {
        id: "westview_community",
        title: "The Community",
        summary: "A close Massachusetts community with civic events, schools, local businesses, and active neighborhood partnerships.",
        highlights: [
          { label: "Community Engagement", value: "Coffee with a Cop, Citizens Academy, Junior Academy" },
          { label: "Nearby Communities", value: "Walpole, Medway, Millis, Franklin" }
        ]
      }
    ],
    createdAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z"
  },
  {
    id: "department_2",
    departmentName: "Harborview Campus Police",
    slug: "harborview-campus-police",
    accountStatus: "active",
    approvalStatus: "active",
    tier: "small",
    city: "Harborview",
    state: "MA",
    zipCode: "02118",
    websiteUrl: "https://example.edu",
    mainPhone: "(617) 555-0120",
    logoUrl: "https://placehold.co/160x160/0a2a55/f5b82e?text=HCP",
    coverImageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    badgeImageUrl: "https://placehold.co/220x220/0a2a55/f5b82e?text=Harborview%0ACampus",
    badgeCreditsRemaining: 8,
    badgeCreditsSent: 1,
    profileIntro: "A campus public-safety team serving students, staff, visitors, and a busy urban academic community.",
    activeJobCount: 2,
    departmentType: "Campus PD",
    hiringTimeline: "Ongoing",
    openPositions: "1 - 2 Officers",
    chiefName: "Maria Alvarez",
    chiefSwornIn: "Aug 15, 2022",
    population: "8,200 Campus Community",
    departmentSize: "20 - 30",
    patrolOfficers: "10 - 15",
    callVolume: "Moderate",
    communityType: "Campus, Urban",
    whyJoin: ["Student-centered public safety", "Predictable campus environment", "Professional development", "Modern communications tools"],
    media: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
    ],
    sections: [
      {
        id: "harborview_inside",
        title: "Inside the Department",
        summary: "Campus patrol operations include residence hall response, event coverage, access control, and student support.",
        highlights: [
          { label: "Station Amenities", value: "Dispatch center, lockers, report room" },
          { label: "Primary Call Types", value: "Medical assists, access control, event support" }
        ]
      },
      {
        id: "harborview_training",
        title: "Training & Growth",
        summary: "Officers receive ongoing training in de-escalation, student affairs collaboration, and community engagement.",
        highlights: [
          { label: "Training Focus", value: "Mental health, campus events, emergency management" }
        ]
      }
    ],
    createdAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z"
  },
  {
    id: "department_3",
    departmentName: "North County Sheriff's Office",
    slug: "north-county-sheriffs-office",
    accountStatus: "active",
    approvalStatus: "active",
    tier: "large",
    city: "North County",
    state: "MA",
    zipCode: "01801",
    websiteUrl: "https://example.org",
    mainPhone: "(978) 555-0144",
    logoUrl: "https://placehold.co/160x160/0a2a55/f5b82e?text=NCSO",
    coverImageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    badgeImageUrl: "https://placehold.co/220x220/0a2a55/f5b82e?text=North%0ACounty",
    badgeCreditsRemaining: 24,
    badgeCreditsSent: 6,
    profileIntro: "A regional public-safety agency supporting corrections, transport, community programs, and specialized operations.",
    activeJobCount: 3,
    departmentType: "Sheriff's Office",
    hiringTimeline: "Within 6 Months",
    openPositions: "5 - 8 Positions",
    chiefName: "Sheriff Daniel Brooks",
    chiefSwornIn: "Jan 01, 2019",
    population: "Countywide Service Area",
    departmentSize: "100+",
    patrolOfficers: "40+",
    callVolume: "High",
    communityType: "Regional, Mixed",
    whyJoin: ["Multiple career tracks", "Specialized unit opportunities", "Strong benefits package", "Regional public-service mission"],
    media: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
    ],
    sections: [
      {
        id: "north_inside",
        title: "Inside the Office",
        summary: "The office supports correctional operations, court transport, regional safety programs, and community engagement.",
        highlights: [
          { label: "Facility Type", value: "Secure holding and regional operations" },
          { label: "Specialty Units", value: "Transport, community programs, training division" }
        ]
      },
      {
        id: "north_growth",
        title: "Training & Growth",
        summary: "Clear career pathways for corrections, operations, leadership, and specialty assignments.",
        highlights: [
          { label: "Academy", value: "Corrections and public-safety training pathways" },
          { label: "Advancement", value: "Supervisor, training, and specialty opportunities" }
        ]
      }
    ],
    createdAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z"
  }
];
