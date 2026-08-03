export const communitySchema = {
  profile: ["displayName", "ageBand", "region", "timeZone", "systems", "roles", "experience", "availability", "format", "accessibilityNeeds"],
  trust: ["emailVerified", "codeOfConductAccepted", "profileReviewed", "tableReferences", "completedSessions", "moderationStatus"],
  listing: ["hostId", "systemId", "campaignType", "format", "region", "schedule", "ageBand", "experienceWelcome", "contentNotes", "accessibility", "seats"],
  privacy: ["No public email or phone number", "Contact remains inside the platform", "Block and report controls", "Minor accounts require guardian or organization-managed participation"]
};

export const trustLevels = [
  ["New", "Email verified and code of conduct accepted."],
  ["Reviewed", "Profile reviewed and identity signals checked by moderation."],
  ["Table-tested", "Completed sessions and references without unresolved reports."],
  ["Community host", "Approved to organize public or youth-safe events."]
];

export const sampleListings = [
  { system:"dnd-2024", role:"player", title:"Beginner-friendly revised 5E one-shot", host:"Mara", format:"In person", region:"Florence, SC", schedule:"Saturday · 6:00 PM", seats:"3 seats", badges:["Reviewed", "Accessible venue"] },
  { system:"pathfinder-2e", role:"player", title:"Pathfinder Remaster learning table", host:"Jon", format:"Online", region:"Eastern Time", schedule:"Wednesday · 7:30 PM", seats:"2 seats", badges:["Table-tested", "New players"] },
  { system:"call-of-cthulhu-7e", role:"player", title:"1920s investigative horror one-shot", host:"Renee", format:"Online", region:"Eastern Time", schedule:"Friday · 8:00 PM", seats:"2 seats", badges:["Reviewed", "18+"] },
  { system:"daggerheart", role:"gm", title:"Seeking a GM for a collaborative campaign", host:"The Lantern Group", format:"Hybrid", region:"Florence, SC", schedule:"Twice monthly", seats:"GM wanted", badges:["Profile reviewed", "Session zero"] },
  { system:"vampire-v5", role:"player", title:"Mature V5 chronicle with safety tools", host:"Ash", format:"Online", region:"Eastern Time", schedule:"Sunday · 7:00 PM", seats:"1 seat", badges:["Table-tested", "21+"] }
];