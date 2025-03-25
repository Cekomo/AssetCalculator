export function formatDate(inputDate: string) {
    // Example input: "26-03-2025 00:47:23"
    
    const dateParts = inputDate.split(' '); // Split date and time
    const date = dateParts[0].split('-'); // Split the date (day, month, year)
    
    // Get the day, month, and last two digits of the year
    const day = date[0];
    const month = date[1];
    const year = date[2].slice(2); // Extract last two digits of the year
    
    // Extract time, excluding the seconds
    const time = dateParts[1].slice(0, 5); // Take only "HH:MM"
    
    // Format the output string
    return `${day}.${month}.${year} ${time}`;
}
