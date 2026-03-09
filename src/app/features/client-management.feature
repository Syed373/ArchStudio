Feature: Client and Meeting Management

  Scenario: Successfully create a new client
    Given the user is on the "Create a Client" page
    When the user enters a valid Name, Email, Address, and Password
    And clicks the "Register" button
    Then a new client should be saved in the database
    And the user receives a success message

  Scenario: Successfully schedule a meeting
    Given the user is on the "Create a Meeting Schedule" page
    When the user enters a Meeting Topic, Number of People, and selects a Start Time
    And clicks the "Schedule Meeting" button
    Then the meeting should be saved in the database