import type {CategorizedStory} from './collection';
// Fictional listing copy only; reference stories and article content remain unchanged.
export const listingEditorial={
  "journey": {
    "name": "Jason Gwee",
    "description": "Once a resident, Jason returned to The Helping Hand as Assistant Chaplain, using his experiences to support others on their own journeys."
  },
  "nadia": {
    "name": "Nadia",
    "description": "Changing her mind is not always easy, but Nadia is discovering how honest conversations can leave room for a different tomorrow."
  },
  "sam": {
    "name": "Sam",
    "description": "For Sam, purpose can be found in useful tasks, shared interests and the small pleasures of everyday life."
  },
  "planned-4": {
    "name": "Maya",
    "description": "An invitation to share a meal gives Maya a chance to see how small gestures can help trust grow."
  },
  "planned-5": {
    "name": "Ethan",
    "description": "Ethan has always been curious. Now he is making room for questions, patient practice and learning at his own pace."
  },
  "planned-6": {
    "name": "Priya",
    "description": "Familiar routes take on new meaning as Priya notices the comfort of everyday places."
  },
  "planned-7": {
    "name": "Marcus",
    "description": "There is no need to settle everything in one conversation. Marcus is making time simply to listen."
  },
  "planned-8": {
    "name": "Aisha",
    "description": "Returning to a skill brings Aisha quiet satisfaction, with something new to notice each time."
  },
  "planned-9": {
    "name": "Wei Ming",
    "description": "A favourite breakfast, a different route: the small choices in a morning matter to Wei Ming."
  },
  "planned-10": {
    "name": "Sofia",
    "description": "Shared interests give Sofia company, even on days when neither person has much to say."
  },
  "planned-11": {
    "name": "Arjun",
    "description": "When plans change, Arjun is learning to adjust a small promise rather than abandon it altogether."
  },
  "planned-12": {
    "name": "Mei Lin",
    "description": "An ordinary object holds a meaning that only Mei Lin can explain, and a story she can choose to share."
  },
  "planned-13": {
    "name": "Grace",
    "description": "A pause can be part of a good day. Grace is making time for rest on her own terms."
  },
  "planned-14": {
    "name": "Ravi",
    "description": "One question leads Ravi to another, with room for uncertainty and an unexpected answer."
  },
  "planned-15": {
    "name": "Clara",
    "description": "Between work and leisure, Clara is shaping routines that support her day without filling every hour."
  },
  "planned-16": {
    "name": "Hafiz",
    "description": "A familiar greeting is one of the small things that draws Hafiz back to a place he enjoys."
  },
  "planned-17": {
    "name": "Isabel",
    "description": "An interest does not need to become an achievement. Isabel is giving hers time to grow."
  },
  "planned-18": {
    "name": "Jun Hao",
    "description": "Sometimes a preference needs to be spoken aloud. Jun Hao is finding the words for what matters to him."
  },
  "planned-19": {
    "name": "Leela",
    "description": "Something familiar looks different to Leela today, without a dramatic moment or an easy conclusion."
  },
  "planned-20": {
    "name": "Adam",
    "description": "A message, a visit, a time to call: Adam keeps a connection going through ordinary habits."
  },
  "planned-21": {
    "name": "Nurul",
    "description": "An unplanned afternoon leaves Nurul free to follow her curiosity, or simply enjoy a quiet hour."
  },
  "planned-22": {
    "name": "Benjamin",
    "description": "Some decisions can wait. Benjamin is making choices at his own pace and leaving a few questions open."
  },
  "planned-23": {
    "name": "Kavya",
    "description": "Working alongside someone gives Kavya more than a finished task; it brings the pleasure of company."
  },
  "planned-24": {
    "name": "Lucas",
    "description": "There is satisfaction in the making itself. Lucas enjoys giving each small detail a little care."
  },
  "planned-25": {
    "name": "Farah",
    "description": "A greeting and a familiar face help Farah feel welcome, in ways too ordinary to need an occasion."
  },
  "planned-26": {
    "name": "Darren",
    "description": "Things to try and small wishes share a page in Darren’s list for tomorrow. None needs a fixed deadline."
  },
  "planned-27": {
    "name": "Anita",
    "description": "Changing a plan can open another route. Anita is leaving room to reconsider what comes next."
  },
  "planned-28": {
    "name": "Zain",
    "description": "An everyday moment gives Zain something worth marking, without needing a grand occasion."
  },
  "planned-29": {
    "name": "Chloe",
    "description": "Listening means leaving room for another view. Chloe is learning to respect what someone chooses to keep private."
  },
  "planned-30": {
    "name": "Dev",
    "description": "A shared plan and a small pleasure give Dev something to look forward to in an ordinary week."
  },
  "planned-31": {
    "name": "Liyana",
    "description": "Asking for help begins with a question. Liyana is deciding what kind of support feels useful to her."
  },
  "planned-32": {
    "name": "Joshua",
    "description": "The words other people use do not tell the whole story. Joshua is choosing his own language for what matters."
  },
  "planned-33": {
    "name": "Siti",
    "description": "Practice and relationships take time. Siti is allowing a little more patience for both."
  },
  "planned-34": {
    "name": "Nikhil",
    "description": "Something enjoyable gives Nikhil a reason to return, and a shared interest becomes a connection."
  },
  "planned-35": {
    "name": "Amelia",
    "description": "Following a question for its own sake brings Amelia the pleasure of finding something she did not expect."
  },
  "planned-36": {
    "name": "Chen Yu",
    "description": "A familiar detail catches Chen Yu’s attention and gives an ordinary moment a different shape."
  },
  "planned-37": {
    "name": "Yasmin",
    "description": "Trying another approach leaves Yasmin with questions as well as possibilities, and that is enough for now."
  },
  "planned-38": {
    "name": "Leon",
    "description": "A story can leave things private. Leon is choosing what to share and how he wants to tell it."
  },
  "planned-39": {
    "name": "Divya",
    "description": "Company, quiet and something new to learn all have a place in Divya’s idea of time well spent."
  },
  "planned-40": {
    "name": "Aaron",
    "description": "Looking ahead does not need a neat conclusion. Aaron is leaving space for the next small step."
  }
} as const;
export function storyDescription(record:CategorizedStory){return listingEditorial[record.id as keyof typeof listingEditorial].description}
