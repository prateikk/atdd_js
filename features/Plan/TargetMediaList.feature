@PlanTargetMediaList
Feature:
  UI Validation - Validate Plan : NEO Messaging

  Background:
    Given I open the application webpage
    And I provide login credentials and submit
    And I am logged into the application

@NavigateToPlanTargetMediaList
  Scenario: Navigate to Plan Target Media List
    Given "Plan" is visible in the navigation menu
    Given I click on "Plan" navigation option
    Then I should see "Plan" screen
    And I click on "Plan Target Media List" from the Dropdown

@CreateNewTargetMediaList
 Scenario: Create a new Target Media List
    #Given I log into the application
    And I move to "Plan Target Media List" section
    And I click on New Target Media List button
    Then I should see Input Field of Target Media List screen
    And I click on List Name Input Field
    And I should enter name of Target Media list
        |Automation Target Media List|
    And I click on Save List button
    Then I should see the "Text area" for which websites to target
    And I should enter keywords of websites to target
        |forbes.com|
        |techcrunch.com|
        |nytimes.com|
        |wired.com|
        |inc.com|
    Then I should see "Go back a step" & "Continue" button
    And I click on "Go back to step"
    Then I should see the List Name of Target Media List
    And I click on Save List button
    Then I should see the "Text area" for which websites to target
    And I click on "Continue" button
    Then I should see created Target Media List on "Plan Target Media List" screen

@SearchValidTargetMediaList
Scenario: Search Valid Target Media List
    #Given I log into the application
    And I move to "Plan Target Media List" section
    Then I should see Search Input Field
    And I click on Search Input Field
    And I enter following keywords in Search Input Field
      | Automation Target Media List |
    Then I should see Searched Target Media List

@SearchInvalidTargetMediaList
Scenario: Search Invalid Target Media List
    #Given I log into the application
    And I move to "Plan Target Media List" section
    Then I should see Search Input Field
    And I click on Search Input Field
    And I enter following keywords in Search Input Field
      | Abc |
    Then I should see No target media list found.

@TargetMediaListAlphabeticalSortingA-Z
Scenario: Target Media List Sorting by Alphabetical A-Z
    #Given I log into the application
    And I move to "Plan Target Media List" section
    Then I should see Alphabetical A-Z Dropdown selected by default
    Then I Should see "Target Media List" Sorted By Alphabetical Order A-Z by default

@TargetMediaListAlphabeticalSortingZ-A
Scenario: Target Media List Sorting by Alphabetical Z-A
    #Given I log into the application
    And I move to "Plan Target Media List" section
    Then I should see Alphabetical A-Z Dropdown selected by default
    And I click on Alphabetical Z-A Dropdown
    Then I should see Alphabetical Z-A Dropdown get selected
    Then I Should see "Target Medai List" Sorted By Alphabetical Order Z-A

@TargetMediaListTileFieldVerification
Scenario: To Verify Artilces,Potential Customers,Total Amplification & Total Interactions Count in Target Media List Tile
    #Given I log into the application
    And I move to "Plan Target Media List" section
    And I move to Created Target Media List
    Then I should see Count on Hover of Target Medai List Tile
        |Articles Artilces|
        |Potential Customers|
        |Total Amplification|
        |Total Interactions|
    Then I should see "Target Medai List Name" in Target Media List Tile

@Add/EditTargetMediaList
Scenario: Add Edit Target Media List
    #Given I log into the application
    And I move to "Plan Target Media List" section
    And I move to Created Target Medai List
    And I click on Three dots drodpown in Target Meda List Tile
    Then I should see "Add/Edit","Delete" & "Export to CSV" Dropwdown Item
    And I click on "Add/Edit" Dropwdown Item
    Then I should see Input Field of Target Media List screen
    And I click on List Name Input Field
    And I should enter name of Target Media list
        |Automation Target Media List|
    And I click on Save List button
    Then I should see the "Text area" for which websites to target
    And I should enter keywords of websites to target
        |forbes.com|
        |techcrunch.com|
        |nytimes.com|
        |wired.com|
        |inc.com|
    Then I should see "Go back a step" & "Continue" button
    And I click on "Go back to step"
    Then I should see the List Name of Target Media List
    And I click on Save List button
    Then I should see the "Text area" for which websites to target
    And I click on "Continue" button
    Then I should see created Target Media List on "Plan Target Media List" screen

@DeleteTargetMediaList
Scenario: Delete Target Media List
    #Given I log into the application
    And I move to "Plan Target Meda List" section
    And I move to Created Target Medai List
    And I click on Three dots drodpown in Target Meda List Tile
    Then I should see "Add/Edit","Delete" & "Export to CSV" Dropwdown Item
    And I click on "Delete" Dropwdown Item
    Then I should see Confirmation Prompt to Delete Target Media List
    And I click on Cancel button
    And I should see "Plan Target Media List" screen
    And I click on Three dots drodpown in "Target Medai List" Tile
    Then I should see "Add/Edit","Delete" & "Export to CSV" Dropwdown Item
    And I click on "Delete" Dropwdown Item
    Then I should see Confirmation Prompt to Delete "Target Media List"
    And I click on Delete button
    Then I should see the count of "Target Media List" is decreased

@ExportToCSVFromTargetMediaList
Scenario: Export to CSV from Target Media List
    #Given I log into the application
    And I move to "Plan Target Meda List" section
    And I move to Created Target Medai List
    And I click on Three dots drodpown in Target Meda List Tile
    Then I should see "Add/Edit","Delete" & "Export to CSV" Dropwdown Item
    And I click on "Export to CSV" Dropwdown Item
    Then I should see Confirmation Prompt of Export is ready for email
    And I click on OK button
    And I should see "Plan Target Media List" screen

@ViewArticlesInAnalyzefromTargetMediaList
Scenario: View Articles In Analyze from Target Media List Tile
    #Given I log into the application
    And I move to "Plan Target Media List" section
    And I should see newly created Target Media List
    And I move to "Target Media List" Tile
    Then I should see "View Articles in Analyze" LinkText
    And I click on View Articles in Analyze LinkText
    Then I should see "Analyze Coverage" screen
    Then I should see "Article List" count



