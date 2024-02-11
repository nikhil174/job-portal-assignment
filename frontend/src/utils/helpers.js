export function convertToIST(timestamp) {
    // Parse the provided timestamp
    const date = new Date(timestamp);

    // Convert to IST (add 5 hours and 30 minutes)
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    // Get date, month, year, hours, minutes, and seconds
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the output (DD/MM/YYYY HH:mm)
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return `${formattedDate} ${formattedTime}`;
}