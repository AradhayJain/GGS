// Mock outfit data - in a real app, this would come from your ML model/API
export const mockOutfitItems = [
  // Tops
  {
    id: 'top-1',
    name: 'Classic White Button Shirt',
    category: 'tops',
    price: 29.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['white', 'blue', 'black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Timeless white button-down shirt perfect for any occasion'
  },
  {
    id: 'top-2',
    name: 'Silk Camisole',
    category: 'tops',
    price: 39.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['beige', 'black', 'navy'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Luxurious silk camisole with delicate straps'
  },
  {
    id: 'top-3',
    name: 'Cashmere Sweater',
    category: 'tops',
    price: 79.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['cream', 'grey', 'camel'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Soft cashmere sweater for ultimate comfort'
  },
  {
    id: 'top-4',
    name: 'Striped Long Sleeve Tee',
    category: 'tops',
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['navy-white', 'black-white', 'red-white'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Classic striped long sleeve tee'
  },
  {
    id: 'top-5',
    name: 'Elegant Blouse',
    category: 'tops',
    price: 45.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['white', 'cream', 'light-pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Sophisticated blouse for professional settings'
  },
  // Bottoms
  {
    id: 'bottom-1',
    name: 'High-Waisted Trousers',
    category: 'bottoms',
    price: 49.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black', 'navy', 'grey'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Tailored high-waisted trousers for a polished look'
  },
  {
    id: 'bottom-2',
    name: 'Midi Skirt',
    category: 'bottoms',
    price: 34.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black', 'burgundy', 'olive'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Elegant midi skirt with A-line silhouette'
  },
  {
    id: 'bottom-3',
    name: 'Wide Leg Jeans',
    category: 'bottoms',
    price: 59.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['dark-wash', 'light-wash', 'black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Trendy wide leg jeans in premium denim'
  },
  {
    id: 'bottom-4',
    name: 'Pleated Skirt',
    category: 'bottoms',
    price: 42.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['navy', 'black', 'burgundy'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Classic pleated skirt for versatile styling'
  },
  // Dresses
  {
    id: 'dress-1',
    name: 'Wrap Dress',
    category: 'dresses',
    price: 59.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['floral', 'solid-black', 'burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Flattering wrap dress perfect for any body type'
  },
  {
    id: 'dress-2',
    name: 'Little Black Dress',
    category: 'dresses',
    price: 69.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Essential little black dress for special occasions'
  },
  {
    id: 'dress-3',
    name: 'Maxi Dress',
    category: 'dresses',
    price: 54.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['floral', 'solid-navy', 'paisley'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Flowing maxi dress for effortless elegance'
  },
  {
    id: 'dress-4',
    name: 'Cocktail Dress',
    category: 'dresses',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black', 'navy', 'emerald'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Sophisticated cocktail dress for evening events'
  },
  // Outerwear
  {
    id: 'outer-1',
    name: 'Blazer',
    category: 'outerwear',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black', 'navy', 'beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Professional blazer for work and formal occasions'
  },
  {
    id: 'outer-2',
    name: 'Denim Jacket',
    category: 'outerwear',
    price: 45.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['light-wash', 'dark-wash', 'black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Classic denim jacket for casual styling'
  },
  {
    id: 'outer-3',
    name: 'Trench Coat',
    category: 'outerwear',
    price: 129.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['beige', 'black', 'navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Timeless trench coat for sophisticated style'
  },
  // Accessories
  {
    id: 'acc-1',
    name: 'Leather Belt',
    category: 'accessories',
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black', 'brown', 'tan'],
    sizes: ['S', 'M', 'L'],
    description: 'Quality leather belt to complete any outfit'
  },
  {
    id: 'acc-2',
    name: 'Statement Necklace',
    category: 'accessories',
    price: 19.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['gold', 'silver', 'rose-gold'],
    sizes: ['One Size'],
    description: 'Bold statement necklace to elevate any look'
  },
  {
    id: 'acc-3',
    name: 'Designer Handbag',
    category: 'accessories',
    price: 149.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black', 'brown', 'burgundy'],
    sizes: ['One Size'],
    description: 'Luxury handbag for sophisticated style'
  },
  // Shoes
  {
    id: 'shoe-1',
    name: 'Block Heel Pumps',
    category: 'shoes',
    price: 79.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black', 'nude', 'navy'],
    sizes: ['6', '7', '8', '9', '10'],
    description: 'Comfortable block heel pumps for all-day wear'
  },
  {
    id: 'shoe-2',
    name: 'White Sneakers',
    category: 'shoes',
    price: 65.99,
    imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['white', 'off-white'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    description: 'Clean white sneakers for casual comfort'
  },
  {
    id: 'shoe-3',
    name: 'Ankle Boots',
    category: 'shoes',
    price: 95.99,
    imageUrl: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: ['black', 'brown', 'tan'],
    sizes: ['6', '7', '8', '9', '10'],
    description: 'Versatile ankle boots for year-round style'
  }
];

// Outfit combinations based on different scenarios
const outfitTemplates = [
  {
    name: 'Professional Power Look',
    items: ['outer-1', 'top-1', 'bottom-1', 'acc-1', 'shoe-1'],
    occasions: ['work', 'formal'],
    styles: ['formal', 'classic'],
    imageUrl: 'https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Elegant Evening',
    items: ['dress-2', 'shoe-1', 'acc-2', 'acc-3'],
    occasions: ['party', 'date'],
    styles: ['formal', 'classic', 'edgy'],
    imageUrl: 'https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Casual Chic',
    items: ['top-3', 'bottom-2', 'acc-1', 'shoe-2'],
    occasions: ['casual', 'vacation'],
    styles: ['casual', 'boho', 'classic'],
    imageUrl: 'https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Sophisticated Feminine',
    items: ['dress-1', 'outer-1', 'shoe-1', 'acc-2'],
    occasions: ['work', 'date', 'party'],
    styles: ['classic', 'formal', 'boho'],
    imageUrl: 'https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Weekend Ready',
    items: ['top-4', 'bottom-3', 'outer-2', 'shoe-2'],
    occasions: ['casual', 'vacation'],
    styles: ['casual', 'boho'],
    imageUrl: 'https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Business Casual',
    items: ['outer-1', 'top-2', 'bottom-1', 'shoe-1', 'acc-1'],
    occasions: ['work', 'casual'],
    styles: ['formal', 'classic', 'casual'],
    imageUrl: 'https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Boho Goddess',
    items: ['dress-3', 'acc-2', 'shoe-2', 'acc-3'],
    occasions: ['casual', 'vacation', 'date'],
    styles: ['boho', 'casual'],
    imageUrl: 'https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Modern Minimalist',
    items: ['top-1', 'bottom-3', 'shoe-2', 'acc-1'],
    occasions: ['casual', 'work'],
    styles: ['classic', 'casual'],
    imageUrl: 'https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'City Explorer',
    items: ['top-5', 'bottom-4', 'outer-3', 'shoe-3', 'acc-3'],
    occasions: ['casual', 'vacation'],
    styles: ['classic', 'casual'],
    imageUrl: 'https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Cocktail Ready',
    items: ['dress-4', 'shoe-1', 'acc-2', 'acc-3'],
    occasions: ['party', 'date'],
    styles: ['formal', 'edgy', 'classic'],
    imageUrl: 'https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Smart Casual',
    items: ['top-2', 'bottom-2', 'outer-2', 'shoe-3', 'acc-1'],
    occasions: ['casual', 'work'],
    styles: ['casual', 'classic'],
    imageUrl: 'https://images.pexels.com/photos/5206040/pexels-photo-5206040.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Effortless Elegance',
    items: ['top-3', 'bottom-1', 'shoe-1', 'acc-2', 'acc-3'],
    occasions: ['work', 'date'],
    styles: ['classic', 'formal'],
    imageUrl: 'https://images.pexels.com/photos/5208024/pexels-photo-5208024.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export function generateOutfitRecommendations(preferences, prompt = '') {
  // Filter outfit templates based on user preferences
  const relevantTemplates = outfitTemplates.filter(template => {
    const occasionMatch = template.occasions.includes(preferences.occasion);
    const styleMatch = template.styles.includes(preferences.style);
    return occasionMatch || styleMatch;
  });

  // If no specific matches, include all templates
  const templatesToUse = relevantTemplates.length > 0 ? relevantTemplates : outfitTemplates;

  // If user provided a prompt, try to match it with outfit names/styles
  let finalTemplates = templatesToUse;
  if (prompt && prompt.trim()) {
    const promptLower = prompt.toLowerCase();
    const promptMatches = templatesToUse.filter(template => 
      template.name.toLowerCase().includes(promptLower) ||
      template.occasions.some(occ => promptLower.includes(occ)) ||
      template.styles.some(style => promptLower.includes(style))
    );
    if (promptMatches.length > 0) {
      finalTemplates = promptMatches;
    }
  }

  return finalTemplates.map((template, index) => {
    const outfitItems = template.items
      .map(itemId => mockOutfitItems.find(item => item.id === itemId))
      .filter(item => item !== undefined);

    const totalPrice = outfitItems.reduce((sum, item) => sum + item.price, 0);
    
    // Calculate match score based on preferences
    let matchScore = 75; // Base score
    
    // Adjust based on occasion match
    if (template.occasions.includes(preferences.occasion)) {
      matchScore += 10;
    }
    
    // Adjust based on style match
    if (template.styles.includes(preferences.style)) {
      matchScore += 10;
    }
    
    // Adjust based on budget
    const budgetRanges = {
      'under-50': [0, 50],
      '50-100': [50, 100],
      '100-200': [100, 200],
      'above-200': [200, Infinity]
    };
    
    const [minBudget, maxBudget] = budgetRanges[preferences.budget];
    if (totalPrice >= minBudget && totalPrice <= maxBudget) {
      matchScore += 5;
    }
    
    // Ensure match score doesn't exceed 100
    matchScore = Math.min(matchScore, 98);

    return {
      id: `outfit-${index + 1}`,
      name: template.name,
      items: outfitItems,
      totalPrice: Math.round(totalPrice * 100) / 100,
      imageUrl: template.imageUrl,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending
}