@Sanity @Plan
Feature:
  UI Validation - Validate Plan : Campaign

  Scenario: Clicking on Plan in left navigation bar opens up Plan screen
    Given "Plan" is visible in the navigation menu
    Given I click on "Plan" navigation option
    Then I should see "Plan" screen
    And "Campaigns" is selected by default

  Scenario: Select profile
    Given I am on "Plan" screen
    And I select "Invisalign" profile from drop-down

  # Create a campaign with all default values and check if the campaign is displayed on dashboard
  Scenario: Create a new campaign
    And I click on "New Campaign" button
    And I enter following phrases in the text area
      | Public Relations  |
      | Behavior analysis |
      | shopping habits   |
    And I click on "Continue" button
    And I enter following keywords in the text area
      | Public Relations  |
      | Behavior analysis |
      | shopping habits   |
    And I click on "Continue" button
    Then I should see "Volume Coverage" on screen
    And I choose the volume coverage option as "Target Media Lists Only"
    And I click on "Continue" button
    Then I should see "Media Channels" on screen
    And I click on "Continue" button
    Then I should see "Interactions" on screen
    And I click on "Continue" button
    Then I should see "Publishers" on screen
    And I click on "Continue" button
    Then I should see "Locations" on screen
    And I click on "Continue" button
    And I select campaign duration as "All Time"
    And I click on "Continue" button
    Then I give campaign name as "Automation Campaign"
    And I click on "Save Campaign" button
    Then I should see "The Campaign has been saved" on screen
    Then I should see "You will receive an email once your Campaign data is ready to be viewed" on screen
    And I click on "Back to Plan Campaign" button
    And I should see "Plan" screen
    And I should see newly created campaign in campaign list

  #Creating new report for Report Tab Testing
  Scenario: Create a new campaign named Automation CampaignRP
    And I click on "New Campaign" button
    And I enter following phrases in the text area
      | Public Relations  |
      | Behavior analysis |
      | shopping habits   |
    And I click on "Continue" button
    And I enter following keywords in the text area
      | Public Relations  |
      | Behavior analysis |
      | shopping habits   |
    And I click on "Continue" button
    Then I should see "Volume Coverage" on screen
    And I choose the volume coverage option as "Target Media Lists Only"
    And I click on "Continue" button
    Then I should see "Media Channels" on screen
    And I click on "Continue" button
    Then I should see "Interactions" on screen
    And I click on "Continue" button
    Then I should see "Publishers" on screen
    And I click on "Continue" button
    Then I should see "Locations" on screen
    And I click on "Continue" button
    And I select campaign duration as "All Time"
    And I click on "Continue" button
    Then I give campaign name as "Automation CampaignRP"
    And I click on "Save Campaign" button
    Then I should see "The Campaign has been saved" on screen
    Then I should see "You will receive an email once your Campaign data is ready to be viewed" on screen
    And I click on "Back to Plan Campaign" button
    And I should see "Plan" screen
    And I should see newly created campaign in campaign list

  Scenario: Delete Plan Campaign
    And  I should see "Search Campaigns" input box
    When I set "Search Campaigns" as "Automation Campaign" on Plan "Campaign" page
    Then I should see "Campaing" named "Automation Campaign" on Plan "Campaign" page
    And I click on option menu
    And I click on "Delete" Dropdown item
    Then I should see Confirmation Prompt to "Delete Campaign"
    And I click on "Delete" button
    And I set "Search Campaigns" as "Automation Campaign" on Plan "Campaign" page
    Then I should see count of Campaign is decreased
