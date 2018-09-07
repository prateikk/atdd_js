@Sanity @Analyze
Feature: Validate Analyze

  Scenario: Select Profiles from Dropdown in Analyze
    Then "Analyze" is visible in the navigation menu
    And I click on "Analyze" navigation option
    And I should see profile selector on screen
    And I select "Invisalign" profile from drop-down

  Scenario: Select campaigns from dropdown in Analyze

    And I should see campaign selector on screen
    And I should see 'All Data' as default on campaign selector
    And I click on campaign selector drop-down
    And I should be able to select a different campaign from drop-down
    And I click on campaign selector drop-down
    And I should be able to clear the campaign
    And I should see 'All Data' as default on campaign selector

  Scenario: Verify Campaign Filter applied to Analyze in Search & Filter
    When I click on campaign selector drop-down
    Then I should be able to select a different campaign from drop-down
    And I should see 'Campaign Filters' is applied to Search & Filter
    And I should see campaign legend is applied to Analyze tile
    When I click on campaign selector drop-down
    Then I should be able to clear the campaign
    # And I should see profile legend is applied to Analyze tile


  Scenario: Reset Graph to Default in Analyze by clicking on Three dots near charts section
    Given I am on "Analyze" screen
    And I click on three dots
    When I click on "Reset graph to default" from the list
    When I click on 'OK' button on the alert

  Scenario: Apply Search & Filter in Analyze
    And I should see Search and Filter selector drop-down changed to "Default"
    And I click on Search and Filter selector drop-down
    And I should be able to select a search and filter keywords from drop-down
    And I should see search and filter is applied to Dashboard tiles


  Scenario: Clear Search & Filter in Analyze
    And I click on Search and Filter selector drop-down
    And I click on 'Clear Search and Filter' from the list
    And I should see Search and Filter selector drop-down changed to "Default"


  Scenario: Add to Dashboard chart by clicking on Three dots near charts section

    And I click on three dots
    When I click on "Add to dashboard" from the list
    Then I am on "Dashboard" screen
    And I should see a new tile "Article Count By Month" added to Dashboard
    And I click on "Analyze" navigation option

    
 Scenario: Verify Publication list by sorted default with Total Covarage
    Given I am on "Analyze" screen
    And I check 'Group by publication' checkbox
    Then Articles are sorted by "Total coverage"


  Scenario: Verify Publication List by clicking on Group by publication checkbox
    Then Article list title contains "Publication List"
    And I uncheck 'Group by publication' checkbox

  @customize
  Scenario: Customize chart in Analyze
   # Given I log into the application
    Given I am on "Analyze" screen
    When I click on "Customize this chart" toggle
    Then I should see "Chart Type" label
    And I select "Column Chart" from "Chart Type" drop-down
    And I select "Article Count" from "Show me" drop-down
    And I select "Time" from "by" drop-down
    Then Time selector drop-down visible
    And I select "Quarter" from time selector drop\-down
    And I select "Competitors" from "Compare" drop-down
    And I select a competitor from Competitor drop\-down
    Then The tile header changes to "Article Count By Quarter"
    And New legend "AllClear ID" is added to the tile
    And "X" axis label becomes "Quarter"
    And "Y" axis label becomes "Article Count"
    And Article list profile selector is added with new profile "AllClear ID"

  Scenario: Click on Article & verify it will open in extended view with details
    Given I am on "Analyze" screen
    And There are articles loaded into Article List view
    Then I select first article from the list
    And Article is opened in extended view
    # following is not displayed for invisalign
    #And 'Set Brand Sentiment' button is displayed
    And I click on close extended articles button

  Scenario: Select first 100 results of articles by clicking three dots dropdown near article list
    Given I am on "Analyze" screen
    And There are articles loaded into Article List view
    When I click on three dots in article list
    Then drop-down menu is visible
    And I click on "Select first 100 results" from article list options drop-down
    Then first "100" articles are selected from the list
    And Heading should contains "100 selected"

  Scenario: Deselect all article list by clicking three dots dropdown near article list
    When I click on three dots in article list
    Then drop-down menu is visible
    And I click on "Deselect All" from article list options drop-down
    Then All the articles are deselected

  Scenario: Add to Dashboard articles by clicking on three dots near article list section
    When I click on three dots in article list
    Then drop-down menu is visible
    And I click on "Add to dashboard" from article list options drop-down
    Then I am on "Dashboard" screen
    And I should see a new tile "Top 5 Articles by Date" added to Dashboard

  Scenario: Verify Sorting of Article List by default with 'Sort by Key Metrics'
    Given "Analyze" is visible in the navigation menu
    And I click on "Analyze" navigation option
    Then I am on "Analyze" screen
    And Articles are sorted by "Sort by Key Metrics"

  Scenario: Verify Article List with Search and Filter
    Given I am on "Analyze" screen
    And I click on "Search and Filter" button
    Then I should see Search and Filter sidebar
    When I select "Influential & Target Media Lists (recommended)" as Filter
    When I select "Target Media Lists Only" as Filter
    Then I see that the articles are filtered accordingly
    When I select "Comprehensive" as Filter


  Scenario: Verify publication List with Search and Filter
    Given I am on "Analyze" screen
    And I check 'Group by publication' checkbox
    And I click on "Search and Filter" button
    Then I should see Search and Filter sidebar
    When I select "Influential & Target Media Lists (recommended)" as Filter
    When I select "Target Media Lists Only" as Filter
    Then I see that the articles are filtered accordingly
    When I select "Comprehensive" as Filter

  Scenario: Apply keywords in Search and Filter
    When I enter following keywords into "Search article title, body, author, publication, URL" textbox
      | jessica twentyman |
    When I enter following keywords into "Article title contains" textbox
      | workday |
    When I enter following keywords into "Publication name contains" textbox
      | diginomica |
    Then I see that the articles are filtered accordingly
    Then I should see Search and Filter selector drop-down changed to "Custom"


  Scenario: Save Search and Filters
    When I click on "Save Search and Filters" button
    And I name the search criteria as "Acceptance Test"
    And I set the filter as "Private to me"
    And I click on "Save" button
    Then Confirmation alert pops-up and contains confirmation text as "Are you sure you want to update"
    And Confirmation alert pops-up and contains confirmation text as "Acceptance Test"
    And I click on "Yes" button
    And I should see Search and Filter selector drop-down changed to "Acceptance Test"


  Scenario: Switch Analyze Coverage Dropdown to Analyze NEO Messaging
    Given I am on "Analyze" screen
    When I select "NEO Messaging" from the analyze dropdown
    Then I should see page header as "Analyze NEO Messaging"
    And I should see NEO Messaging pane
    And I should see Soundbyte Performance pane
