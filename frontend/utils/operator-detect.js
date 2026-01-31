export const detectOperator = (phone) => {
  // Remove country code if present (+91 or 91)
  const cleanPhone = phone.replace(/^(\+91|91)/, '');

  if (!cleanPhone || cleanPhone.length < 4) return 'Unknown';

  const prefix = parseInt(cleanPhone.substring(0, 4), 10);
  const shortPrefix = parseInt(cleanPhone.substring(0, 2), 10);

  // Simplified mapping for demo purposes. 
  // In a real app, this would be a comprehensive database or API lookup.
  
  // Jio: 6xx, 7xx (Shared), 98, 99 (Legacy)
  const jioPrefixes = [98, 99, 60, 61, 62, 63, 64, 70, 79];
  // Airtel: 90, 91, 92, 93
  const airtelPrefixes = [90, 91, 92, 93, 80, 81];
  // Vi: 94, 95, 96, 97
  const viPrefixes = [94, 95, 96, 97, 84, 85];
  // BSNL: 88, 89
  const bsnlPrefixes = [88, 89, 94]; // BSNL often shares 94

  if (jioPrefixes.includes(shortPrefix)) return 'Jio';
  if (airtelPrefixes.includes(shortPrefix)) return 'Airtel';
  if (viPrefixes.includes(shortPrefix)) return 'Vi';
  if (bsnlPrefixes.includes(shortPrefix)) return 'BSNL';

  // Fallback checks
  if (cleanPhone.startsWith('6') || cleanPhone.startsWith('7')) return 'Jio';
  if (cleanPhone.startsWith('9')) return 'Airtel';
  if (cleanPhone.startsWith('8')) return 'Vi';

  return 'Unknown';
};

export const getOperatorColor = (operator) => {
  switch (operator) {
    case 'Jio': return 'bg-jio text-white';
    case 'Airtel': return 'bg-airtel text-white';
    case 'Vi': return 'bg-vi text-black';
    case 'BSNL': return 'bg-bsnl text-white';
    default: return 'bg-gray-400 text-white';
  }
};

export const getOperatorBorder = (operator) => {
  switch (operator) {
    case 'Jio': return 'border-jio';
    case 'Airtel': return 'border-airtel';
    case 'Vi': return 'border-vi';
    case 'BSNL': return 'border-bsnl';
    default: return 'border-gray-200';
  }
};