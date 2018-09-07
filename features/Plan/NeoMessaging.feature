@PlanNEOMessaging
Feature:
  UI Validation - Validate Plan : NEO Messaging 

  Background:
    Given I open the application webpage
    And I provide login credentials and submit
    And I am logged into the application

@NavigateToPlanNEOMessaging
  Scenario: Navigate to Plan NEO Messaging 
    Given "Plan" is visible in the navigation menu
    Given I click on "Plan" navigation option
    Then I should see "Plan" screen
    And I click on "Plan NEO Messaging" from the Dropdown
   
@VerifyCorporateBuckets
 Scenario: Verify Corporate Buckets 
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    Then I should see "Corporate Buckets" list by default 

@CreateNewBucket&Soundbyte
 Scenario: Create a new Bucket & Soundbyte 
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    And I click on "New Bucket" Linktext 
    Then I should see "New Bucket" Screen 
    And I give Bucket name as "Automation Bucket"
    And I click on Save Bucket button 
    Then I should see "Automation Bucket" in left panel of Buckets
    And I click on "New Soundbyte" button 
    Then I should see "New Soundbyte" Screen 
    And I give Soundbyte name as "Automation Soundbyte"
    And I click on Create Soundbyte button
    Then I should see "Automation Soundbyte" created for "Automation Bucket"

@SearchValidSoundbyte
Scenario: Search Valid Soundbyte 
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    Then I should see Search Input Field
    And I click on Search Input Field
    And I enter following keywords in Search Input Field 
      | Automation Soundbyte |
    Then I should see Searched Soundbyte

@SearchInvalidSoundbyte
Scenario: Search Invalid Soundbyte
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    Then I should see Search Input Field
    And I click on Search Input Field
    And I enter following keywords in Search Input Field 
      | Abc |
    Then I should see No NEO™ messages were found in this bucket that match your search. found message

@SoundbyteAlphabeticalSortingA-Z
Scenario: Soundbyte Sorting by Alphabetical A-Z
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    Then I should see Alphabetical A-Z Dropdown selected by default
    Then I Should see "Soundbyte" Sorted By Alphabetical Order A-Z by default

@SoundbyteAlphabeticalSortingZ-A
Scenario: Soundbyte Sorting by Alphabetical Z-A
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    Then I should see Alphabetical A-Z Dropdown selected by default
    And I click on Alphabetical Z-A Dropdown     
    Then I should see Alphabetical Z-A Dropdown get selected
    Then I Should see "Soundbyte" Sorted By Alphabetical Order Z-A

@SoundbyteTileFieldVerification 
Scenario: To Verify Artilces,Potential Customers,Total Amplification & Total Interactions Count in Soundbyte Tile 
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    Then I should see "Corporate Buckets" list by default 
    And I move to any of Soundbyte Tile 
    Then I should see Count on Hover of Soundbyte Tile 
        |Articles Artilces|
        |Potential Customers|
        |Total Amplification| 
        |Total Interactions| 
    Then I should see "Soundbyte Name" in Soundbyte Tile

@EditSoundbyte
Scenario: Edit Soundbyte
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    Then I move to newly created bucket 
    And I click on Three dots drodpown in Soundbyte Tile 
    Then I should see "Edit" & "Delete" Dropwdown Item
    And I click on "Edit" Dropwdown Item
    Then I should see "Edit Soundbyte" screen 
    And I can update the "Soundbyte" name from input field  
    And I click on "Save Soundbyte" button 
    Then I should see the message that Soundbyte is saved 
    And I click on Back to Messaging button 
    Then I should see "Plan NEO Messaging" screen
    

@DeleteSoundbyte 
Scenario: Delete Soundbyte
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    And I move to newly Created Bucket 
    And I move to any of Soundbyte Tile 
    And I click on Three dots drodpown in Soundbyte Tile 
    Then I should see "Edit" & "Delete" Dropwdown Item
    And I click on "Delete" Dropwdown Item
    Then I should see Confirmation Prompt to Delete Soundbyte
    And I click on Cancel button 
    And I should see "Plan NEO Messaging" screen
    And I click on Three dots drodpown in "Soundbyte" Tile 
    Then I should see "Edit" & "Delete" Dropwdown Item 
    And I click on "Delete" Dropwdown Item
    Then I should see Confirmation Prompt to Delete Soundbyte
    And I click on Delete button 
    Then I should see the count of Soundbyte is decreased

@ViewArticlesInAnalyzefromSoundbyte
Scenario: View Articles In Analyze from Soundbyte Tile 
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    And I should see newly created Soundbyte in Soundbyte list
    And I move to "Soundbyte" Tile 
    Then I should see "View Articles in Analyze" LinkText
    And I click on View Articles in Analyze LinkText
    Then I should see "Analyze Coverage" screen
    Then I should see "Article List" count 

@ViewMessagePerformanceInAnalyzefromSoundbyte
Scenario: View Articles In Analyze from Soundbyte Tile 
    #Given I log into the application
    And I move to "Plan NEO Messaging" section
    And I should see newly created Soundbyte in Soundbyte list
    And I move to "Soundbyte" Tile 
    Then I should see "View Message Performance in Analyze" LinkText
    And I click on View Articles in Analyze LinkText
    Then I should see "Analyze NEO Messaging" screen with details 
        |NEO Soundbytes|
        |Soundbyte Performance|

