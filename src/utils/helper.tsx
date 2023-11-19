export const isWorkingDay = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    // TODO: Add isPublicHoliday(date)
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return false;
    }
    return true;
};
  


