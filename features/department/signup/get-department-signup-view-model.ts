import { mockDepartments } from "@/lib/mock/departments";
import { mockNotifications } from "@/lib/mock/notifications";
import { mockUsers } from "@/lib/mock/users";

export const departmentTierOptions = [
  { label: "Select requested tier", value: "" },
  { label: "Small department", value: "small" },
  { label: "Medium department", value: "medium" },
  { label: "Large department", value: "large" },
  { label: "XL department", value: "xl" },
  { label: "Custom plan", value: "custom" }
];

export const usStateOptions = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" }
];

export const usCityOptionsByState: Record<string, { label: string; value: string }[]> = {
  AL: ["Birmingham", "Huntsville", "Mobile", "Montgomery"].map((city) => ({ label: city, value: city })),
  AK: ["Anchorage", "Fairbanks", "Juneau", "Sitka"].map((city) => ({ label: city, value: city })),
  AZ: ["Chandler", "Mesa", "Phoenix", "Tucson"].map((city) => ({ label: city, value: city })),
  AR: ["Fayetteville", "Fort Smith", "Little Rock", "Springdale"].map((city) => ({ label: city, value: city })),
  CA: ["Fresno", "Los Angeles", "Sacramento", "San Diego", "San Francisco", "San Jose"].map((city) => ({ label: city, value: city })),
  CO: ["Aurora", "Colorado Springs", "Denver", "Fort Collins"].map((city) => ({ label: city, value: city })),
  CT: ["Bridgeport", "Hartford", "New Haven", "Stamford"].map((city) => ({ label: city, value: city })),
  DE: ["Dover", "Middletown", "Newark", "Wilmington"].map((city) => ({ label: city, value: city })),
  FL: ["Jacksonville", "Miami", "Orlando", "Tallahassee", "Tampa"].map((city) => ({ label: city, value: city })),
  GA: ["Atlanta", "Augusta", "Columbus", "Savannah"].map((city) => ({ label: city, value: city })),
  HI: ["Hilo", "Honolulu", "Kailua", "Kapolei"].map((city) => ({ label: city, value: city })),
  ID: ["Boise", "Idaho Falls", "Meridian", "Nampa"].map((city) => ({ label: city, value: city })),
  IL: ["Aurora", "Chicago", "Naperville", "Springfield"].map((city) => ({ label: city, value: city })),
  IN: ["Evansville", "Fort Wayne", "Indianapolis", "South Bend"].map((city) => ({ label: city, value: city })),
  IA: ["Cedar Rapids", "Davenport", "Des Moines", "Sioux City"].map((city) => ({ label: city, value: city })),
  KS: ["Kansas City", "Lawrence", "Overland Park", "Wichita"].map((city) => ({ label: city, value: city })),
  KY: ["Bowling Green", "Frankfort", "Lexington", "Louisville"].map((city) => ({ label: city, value: city })),
  LA: ["Baton Rouge", "Lafayette", "New Orleans", "Shreveport"].map((city) => ({ label: city, value: city })),
  ME: ["Augusta", "Bangor", "Lewiston", "Portland"].map((city) => ({ label: city, value: city })),
  MD: ["Annapolis", "Baltimore", "Frederick", "Rockville"].map((city) => ({ label: city, value: city })),
  MA: ["Boston", "Cambridge", "Lowell", "Springfield", "Westview", "Worcester"].map((city) => ({ label: city, value: city })),
  MI: ["Ann Arbor", "Detroit", "Grand Rapids", "Lansing"].map((city) => ({ label: city, value: city })),
  MN: ["Duluth", "Minneapolis", "Rochester", "Saint Paul"].map((city) => ({ label: city, value: city })),
  MS: ["Biloxi", "Gulfport", "Hattiesburg", "Jackson"].map((city) => ({ label: city, value: city })),
  MO: ["Columbia", "Jefferson City", "Kansas City", "St. Louis"].map((city) => ({ label: city, value: city })),
  MT: ["Billings", "Bozeman", "Great Falls", "Helena"].map((city) => ({ label: city, value: city })),
  NE: ["Bellevue", "Grand Island", "Lincoln", "Omaha"].map((city) => ({ label: city, value: city })),
  NV: ["Carson City", "Henderson", "Las Vegas", "Reno"].map((city) => ({ label: city, value: city })),
  NH: ["Concord", "Derry", "Manchester", "Nashua"].map((city) => ({ label: city, value: city })),
  NJ: ["Edison", "Jersey City", "Newark", "Trenton"].map((city) => ({ label: city, value: city })),
  NM: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"].map((city) => ({ label: city, value: city })),
  NY: ["Albany", "Buffalo", "New York", "Rochester", "Syracuse"].map((city) => ({ label: city, value: city })),
  NC: ["Asheville", "Charlotte", "Durham", "Raleigh"].map((city) => ({ label: city, value: city })),
  ND: ["Bismarck", "Fargo", "Grand Forks", "Minot"].map((city) => ({ label: city, value: city })),
  OH: ["Cincinnati", "Cleveland", "Columbus", "Toledo"].map((city) => ({ label: city, value: city })),
  OK: ["Edmond", "Norman", "Oklahoma City", "Tulsa"].map((city) => ({ label: city, value: city })),
  OR: ["Bend", "Eugene", "Portland", "Salem"].map((city) => ({ label: city, value: city })),
  PA: ["Allentown", "Harrisburg", "Philadelphia", "Pittsburgh"].map((city) => ({ label: city, value: city })),
  RI: ["Cranston", "Newport", "Providence", "Warwick"].map((city) => ({ label: city, value: city })),
  SC: ["Charleston", "Columbia", "Greenville", "Myrtle Beach"].map((city) => ({ label: city, value: city })),
  SD: ["Aberdeen", "Pierre", "Rapid City", "Sioux Falls"].map((city) => ({ label: city, value: city })),
  TN: ["Chattanooga", "Knoxville", "Memphis", "Nashville"].map((city) => ({ label: city, value: city })),
  TX: ["Austin", "Dallas", "Houston", "San Antonio"].map((city) => ({ label: city, value: city })),
  UT: ["Ogden", "Provo", "Salt Lake City", "West Valley City"].map((city) => ({ label: city, value: city })),
  VT: ["Bennington", "Burlington", "Montpelier", "Rutland"].map((city) => ({ label: city, value: city })),
  VA: ["Alexandria", "Norfolk", "Richmond", "Virginia Beach"].map((city) => ({ label: city, value: city })),
  WA: ["Olympia", "Seattle", "Spokane", "Tacoma"].map((city) => ({ label: city, value: city })),
  WV: ["Charleston", "Huntington", "Morgantown", "Wheeling"].map((city) => ({ label: city, value: city })),
  WI: ["Green Bay", "Madison", "Milwaukee", "Racine"].map((city) => ({ label: city, value: city })),
  WY: ["Casper", "Cheyenne", "Gillette", "Laramie"].map((city) => ({ label: city, value: city }))
};

export function getDepartmentSignupViewModel() {
  const approvalQueueCount = mockDepartments.filter((department) => department.approvalStatus === "pending_approval").length;
  const gbAdminNotifications = mockNotifications.filter(
    (notification) => notification.recipientRole === "gb_admin" && notification.type === "approval_requested"
  );

  return {
    tierOptions: departmentTierOptions,
    stateOptions: usStateOptions,
    cityOptionsByState: usCityOptionsByState,
    approvalQueueCount,
    gbAdminNotificationCount: gbAdminNotifications.length,
    supportEmail: "support@getbadged.com"
  };
}

export function getPendingDepartmentApprovalViewModel() {
  const department =
    mockDepartments.find((item) => item.accountStatus === "pending_approval" && item.approvalStatus === "pending_approval") ??
    mockDepartments[0];
  const primaryAdmin = mockUsers.find((user) => user.id === department.primaryAdminUserId);
  const approvalQueuePosition =
    mockDepartments.filter((item) => item.approvalStatus === "pending_approval").findIndex((item) => item.id === department.id) + 1;

  return {
    department,
    primaryAdmin,
    approvalQueuePosition: approvalQueuePosition > 0 ? approvalQueuePosition : 1,
    lockedFeatures: ["Department Profile builder", "Job Post builder", "Badge Pool", "Applicant Pool", "Messaging and exports"],
    timeline: [
      {
        label: "Registration received",
        description: "Your department details and primary admin account are in the GB Admin approval queue.",
        status: "complete" as const
      },
      {
        label: "GB Admin verification",
        description: "GetBadged verifies the department identity, admin contact, and requested plan.",
        status: "in_progress" as const
      },
      {
        label: "Workspace activation",
        description: "After approval, your Department workspace unlocks profile, jobs, Badge Pool, and applicant tools.",
        status: "not_started" as const
      }
    ]
  };
}
