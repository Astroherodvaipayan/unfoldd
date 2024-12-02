document.addEventListener('DOMContentLoaded', function() {
    // Load existing members
    displayMembers();

    // Handle form submission
    document.getElementById('group-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('member-name').value.trim();
        const upi = document.getElementById('member-upi').value.trim();
        const sui = document.getElementById('member-sui').value.trim();
        const okto = document.getElementById('member-okto').value.trim();
        const base = document.getElementById('member-base').value.trim();

        // Create member object
        const member = {
            name: name,
            upi: upi,
            sui: sui,
            okto: okto,
            base: base
        };

        // Get existing members or initialize empty array
        let groupMembers = JSON.parse(localStorage.getItem('groupMembers')) || [];
        
        // Add new member
        groupMembers.push(member);
        
        // Save to localStorage
        localStorage.setItem('groupMembers', JSON.stringify(groupMembers));

        // Refresh the display
        displayMembers();

        // Reset form
        this.reset();
    });

    // Handle reset button
    document.getElementById('reset-button').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset? This will remove all members.')) {
            localStorage.removeItem('groupMembers');
            displayMembers(); // Refresh display after reset
        }
    });
});

// Function to display members
function displayMembers() {
    const membersList = document.getElementById('members-list');
    membersList.innerHTML = ''; // Clear current list
    
    const groupMembers = JSON.parse(localStorage.getItem('groupMembers')) || [];
    
    groupMembers.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name || ''}</td>
            <td>${member.upi || ''}</td>
            <td>${member.sui || ''}</td>
            <td>${member.okto || ''}</td>
            <td>${member.base || ''}</td>
        `;
        membersList.appendChild(row);
    });
}