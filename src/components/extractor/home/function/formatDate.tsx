export const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    const [dayName, monthName, day, year] = formattedDate.split(" ");
  
    return {
      day: day,
      dayName: dayName.replace(",", ""),
      month: monthName,
      year: year,
      data: dateString, // You can adjust this if you need a different data format
    };
  }

  export interface interfaceItem {
    date: Date;
    count: number;
  }
  
  export interface interfaceData {
    count: number
    data: string
    day: string
    dayName: string
    month: string
    year: string
  }
  