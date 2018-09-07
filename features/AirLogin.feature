@test1
Feature: Verify user log in to AirPR

    @invalid
  Scenario: Login with invalid credentials
    #Below test cases suffice testing of navigation to application
    # & validate login page
    Given I open the application webpage
    When I am on login page
    And I should see Login button and forgot password option
    Then I provide invalid login credentials and submit
    Then I should see the error message "Invalid Email or password." for Password field


  Scenario: Successful login
    #Below test cases suffice testing of navigation to application
    # & validate login page
    Given I open the application webpage
    When I am on login page
    And I should see Login button and forgot password option
    Then I provide login credentials and submit
    Then I am logged into the application


 Scenario: Log out of the application
    When I am on "Dashboard" screen
    And I log out of the application
    Then I am on login page