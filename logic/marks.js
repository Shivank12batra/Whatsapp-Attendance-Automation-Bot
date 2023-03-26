const getAttendanceMarks = (percentage) => {
    if (percentage >= 67 && percentage <= 70) return 1
    else if (percentage >= 70 && percentage <= 75) return 2
    else if (percentage >= 75 && percentage <= 80) return 3
    else if (percentage >= 80 && percentage <= 85) return 4
    else if (percentage >= 85) return 5
    return 0
}

module.exports = getAttendanceMarks