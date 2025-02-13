export const INTRO_DIALOGUES = {
  items: {
    welcome: {
      type: 'message',
      text: 'Hello, wanderer! Welcome to the island of Bananas, where going bananas never tasted so good!',
    },
    introduction: {
      type: 'message',
      text: "I'm here to guide you through this exciting journey.",
    },
    readyQuestion: {
      type: 'question',
      text: 'Are you ready to begin your quest?',
      choices: ['YES', 'NO'],
      responses: {
        YES: {
          nextDialogue: 'startGame',
          action: 'START_GAME',
        },
        NO: {
          nextDialogue: 'comeback',
          action: 'RESTART',
        },
      },
    },
    startGame: {
      type: 'message',
      text: "Excellent! Let's begin your adventure!",
    },
    comeback: {
      type: 'message',
      text: "Oh... Well, come back when you're ready!",
    },
  },

  // Define the sequence of dialogues to show
  sequence: ['welcome', 'introduction', 'readyQuestion'],
};
