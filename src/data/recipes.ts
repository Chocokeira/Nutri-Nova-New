export interface RecipeInspiration {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  category: string;
  image: string;
  productsUsed: string[];
  description: string;
}

export const RECIPE_INSPIRATIONS: RecipeInspiration[] = [
  {
    id: 'olive-oil-citrus-dressing',
    title: 'Heirloom Garden Greens & Cold-Pressed Emulsion',
    subtitle: 'Crisp market herbs, flaky sea salt, and single-estate Greek olive oil',
    time: '10 mins',
    category: 'Table Ritual',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    productsUsed: ['Single-Estate Extra Virgin Olive Oil'],
    description:
      'Whisk early-harvest olive oil with freshly squeezed lemon juice, a pinch of crushed wild oregano, and sea salt. Drizzle generously over bitter chicory, shaved fennel, and warm flatbread.',
  },
  {
    id: 'honey-almond-yogurt-bowl',
    title: 'Strained Yogurt Parfait with Thyme Honey & Roasted Almonds',
    subtitle: 'Thick Mediterranean probiotic bowl finished with mountain honey',
    time: '5 mins',
    category: 'Morning Routine',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    productsUsed: ['Authentic Greek Strained Yogurt', 'Selection Roasted Almonds'],
    description:
      'Spoon chilled strained yogurt into a wide earthenware bowl. Drizzle slow-dripping raw Greek honey in ribbons and top with coarsely chopped slow-roasted almonds for an energizing breakfast.',
  },
  {
    id: 'pomegranate-mineral-spritzer',
    title: 'Sparkling Pomegranate & Mountain Herbal Spritzer',
    subtitle: 'Cold-pressed wild pomegranate lifted with 22-mineral artesian sparkle',
    time: '3 mins',
    category: 'Afternoon Refresh',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    productsUsed: ['Chortoq Thermal Mineral Water', 'Cold-Pressed Pomegranate Nectar'],
    description:
      'Fill a tall crystal tumbler with ice. Pour 75ml of pure cold-pressed pomegranate juice and top with chilled Chortoq Sparkling Mineral Water. Garnish with fresh mint and a twist of citrus rind.',
  },
  {
    id: 'mediterranean-sardine-toast',
    title: 'Charred Sourdough with Sea Salt Sardines & Herbs',
    subtitle: 'Wild Mediterranean harvest on toasted sourdough with warm olive drizzle',
    time: '12 mins',
    category: 'Rustic Lunch',
    image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=800&q=80',
    productsUsed: ['Wild Mediterranean Sardines', 'Single-Estate Extra Virgin Olive Oil'],
    description:
      'Rub charred sourdough with a cut garlic clove. Layer succulent wild sardines, shaved sweet red onions, and flat-leaf parsley. Finish with a generous ribbon of peppery cold-extracted olive oil.',
  },
];
