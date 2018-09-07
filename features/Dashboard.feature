@Sanity @Dashboard
Feature: Dashboard Validations

  @dragdrop
  Scenario: Drag and drop tiles onto Dashboard
    And I click on "Dashboard" navigation option
    Given I am on "Dashboard" screen
    And I select "Invisalign" profile from drop-down
    And I clear the dashboard tiles
    When I click on "Customize" button
    Then I should see "Customize Dashboard" on screen
    And I expand "Coverage" section
    And I drag the this tile to the Dashboard tile area "Which publications gave us the most coverage during period?"
    Then I should see a new tile "Article Count By Publisher Type" added to Dashboard


  Scenario: Select profiles from dropdown in dashboard
    And I should see profile selector on screen
    And I click on profile selector drop-down
    Then I select "Invisalign" profile from drop-down

  Scenario: Select campaigns from dropdown in dashboard
    And I should see campaign selector on screen
    And I should see 'All Data' as default on campaign selector
    And I click on campaign selector drop-down
    And I should be able to select a different campaign from drop-down
    And I click on campaign selector drop-down
    And I should be able to clear the campaign
    And I should see 'All Data' as default on campaign selector

  Scenario: Verify Campaign Filter applied to Dashboard in Search & Filter
    When I click on campaign selector drop-down
    Then I should be able to select a different campaign from drop-down
    And I should see 'Campaign Filters' is applied to Search & Filter
    And I should see campaign legend is applied to Dashboard tiles
    When I click on campaign selector drop-down
    Then I should be able to clear the campaign
    And I should see profile legend is applied to Dashboard tiles

  Scenario: Clear Campaign from Dashboard
    When I click on campaign selector drop-down
    Then I should be able to select a different campaign from drop-down
    And I should see 'Campaign Filters' is applied to Search & Filter
    And I should see campaign legend is applied to Dashboard tiles
    When I click on campaign selector drop-down
    Then I should be able to clear the campaign
    And I should see Search and Filter selector drop-down changed to "Widget Defaults"

  Scenario: Apply Search & Filter in Dashboard
    And I should see Search and Filter selector drop-down changed to "Widget Defaults"
    And I click on Search and Filter selector drop-down
    And I should be able to select a search and filter keywords from drop-down
    And I should see search and filter is applied to Dashboard tiles


  Scenario: Reset Search & Filter in Dashboard
    And I click on Reset search & filters link text
    And I should see Search and Filter selector drop-down changed to "Widget Defaults"


  Scenario: Clear Search & Filter in Dashboard
    # Given I log into the application
    And I click on Search and Filter selector drop-down
    And I should be able to select a search and filter keywords from drop-down
    And I should see search and filter is applied to Dashboard tiles
    And I click on Search and Filter selector drop-down
    And I click on 'Revert to Widget Defaults' from the list
    And I should see Search and Filter selector drop-down changed to "Widget Defaults"

  @openInAnalyse
  Scenario: Click on Dashboard tile & Verify it will open in Analyze tab
    Given I am on "Dashboard" screen
    And I click on "Article Count By Publisher Type" tile
    Then Tile is opened in Analyze