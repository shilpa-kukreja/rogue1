export const getBrowser = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('Chrome') && !userAgent.includes('Edg') && !userAgent.includes('OPR')) {
    return 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  } else if (userAgent.includes('Edg')) {
    return 'Edge';
  } else if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
    return 'Opera';
  } else if (userAgent.includes('Trident')) {
    return 'Internet Explorer';
  }

  return 'Unknown';
};
