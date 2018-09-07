@PlanCampaigns
Feature:
  UI Validation - Validate Plan : Campaign

  Background:
    Given I open the application webpage
    And I provide login credentials and submit
    And I am logged into the application

  @openPlan
  Scenario: Clicking on Plan in left navigation bar opens up Plan screen
    Given "Plan" is visible in the navigation menu
    Given I click on "Plan" navigation option
    Then I should see "Plan" screen
    And "Campaigns" is selected by default
   # And I click on New Campaign button


  @CampaignCreation
  Scenario: Create a new campaign
    #Given I log into the application
    And I move to "Plan" section
    And I click on New Campaign button
    And I enter following phrases in the text area
      | Public Relations  |
      | Behavior analysis |
      | shopping habits   |
    And I click on Continue button
    And I enter following keywords in the text area
      | Public Relations  |
      | Behavior analysis |
      | shopping habits   |
    And I click on Continue button
    Then I should see "Volume Coverage" on screen
    And I choose the volume coverage option as "Target Media Lists Only"
    And I click on Continue button
    Then I should see "Media Channels" on screen
    And I click on Continue button
    Then I should see "Interactions" on screen
    And I click on Continue button
    Then I should see "Publishers" on screen
    And I click on Continue button
    Then I should see "Locations" on screen
    And I click on Continue button
    And I select campaign duration as All time
    And I click on Continue button
    Then I give campaign name as "Automation Campaign"
    And I click on Save Campaign button
    And I should see "Plan" screen
    And I should see newly created campaign in campaign list

@CampaignUiValidation 
Scenario: Verify Campaign Creation UI Fields 
    #Given I log into the application
    And I move to "Plan" section
    Then I should see the New Campiagn button    
    And I click on New Campaign button
    Then I should see "text area" Field
    And I should see "Go back step" and "Skip for now" text
    And I enter following phrases in the text area
      | Public Relations  |
      | Behavior analysis |
      | shopping habits   |
    Then I should see the Continue button 
    And I click on Continue button
    Then I should see "text area" Field
    Then I should see "Go back step" & "Skip for now" text
    And I enter following keywords in the text area
      | Public Relations  |
      | Behavior analysis |
      | shopping habits   |
    Then I should see Continue button  
    And I click on Continue button
    Then I should see "Volume Coverage" on screen
    And I choose the volume coverage option as "Target Media Lists Only"
    And I click on Continue button
    Then I should see "Media Channels" on screen
    And I click on Continue button
    Then I should see "Interactions" on screen
    And I click on Continue button
    Then I should see "Publishers" on screen
    And I click on Continue button
    Then I should see "Locations" on screen
    And I click on Continue button
    And I select campaign duration as All time
    And I click on Continue button
    Then I give campaign name as "Automation Campaign"
    And I click on Save Campaign button
    And I should see "Plan" screen
    And I should see newly created campaign in campaign list
    
@CampaignValidSearch
Scenario: Search Valid Campaign
    #Given I log into the application
    And I move to "Plan" section
    Then I should see Search Input Field
    And I click on Search Input Field
    And I enter following keywords in Search Input Field 
      | Automation Campaign |
    Then I should see Searched Campaign

@CampaignInvalidSearch
Scenario: Search Invalid Campaign
    #Given I log into the application
    And I move to "Plan" section
    Then I should see Search Input Field
    And I click on Search Input Field
    And I enter following keywords in Search Input Field 
      | Abc |
    Then I should see No campaigns found message

@CampaignAlphabeticalSortingA-Z
Scenario: Campaign Sorting by Alphabetical A-Z
    #Given I log into the application
    And I move to "Plan" section
    Then I should see Alphabetical A-Z Dropdown selected by default
    Then I Should see "Campaigns" Sorted By Alphabetical Order A-Z by default

@CampaignAlphabeticalSortingZ-A
Scenario: Campaign Sorting by Alphabetical Z-A
    #Given I log into the application
    And I move to "Plan" section
    Then I should see Alphabetical A-Z Dropdown selected by default
    And I click on Alphabetical Z-A Dropdown     
    Then I should see Alphabetical Z-A Dropdown get selected
    Then I Should see "Campaigns" Sorted By Alphabetical Order Z-A

@CampaignTileFieldVerification 
Scenario: To Verify Artilces,Potential Customers,Total Amplification & Total Interactions Count in Campaign Tile 
    #Given I log into the application
    And I move to "Plan" section
    And I should see newly created campaign in campaign list
    And I move to any of Campaign Tile 
    Then I should see Count on Hover of Campaign Tile 
        |Articles Artilces|
        |Potential Customers|
        |Total Amplification| 
        |Total Interactions| 
    Then I should see "Campaign Name" & "Campaign Description" in Campaign Tile 

@CampaignPreview/Edit 
Scenario: To Preview Edit Campaign 
   #Given I log into the application
    And I move to "Plan" section
    And I should see newly created campaign in campaign list
    And I click on Three dots drodpown in Campaign Tile 
    Then I should see "Preview/Edit" Dropwdown Item 
    Then I should see "Delete" Dropwdown Item
    And I click on "Preview/Edit" Dropwdown Item
    Then I should see Campaign Details Preview 
    Then I should see LinkText of in Campaign Details Preview
        |Campaign Name|
        |Date Range|
        |Keywords|
        |Interactions|
        |Locations|
        |Volume|
        |Channels|
        |Publishers|
    And I click on Campaign Name LinkText 
    Then I should see "Campaign Name" on screen
    And I should edit Campaign Name as
        |Automation Campaign New|
    And I click on "Date Range" LinkText 
    Then I should see "Date" on screen
    And I choose the Date range as Ongoing,begining
    And I click on Keywords LinkText 
    Then I should see "Keywords" on screen
    And I should edit "Keywords" as
        |Donald Trump|
    And I click on Interactions LinkText 
    Then I should see "Interactions" on screen
    And I should Check & Uncheck the Checkboxes of Interactions
    And I click on Location LinkText 
    Then I should see "Locations" on screen
    And I should Check & Uncheck the Checkboxes of Locations 
    And I click on Volume LinkText
    Then I should see "Volume Coverage" on screen
    And I choose the volume coverage option as "Target Media Lists Only"
    And I click on Channels LinkText
    Then I should see "Media Channels" on screen
    And I should Check & Uncheck the Checkboxes of Media Channels
    And I clik on Publishers LinkText
    Then I should see "Publishers" on screen
    And I should Check & Uncheck the Checkboxes of Publishers
    And I click on Save button 
    And I should see "Plan" screen
    And I should see edited Campaign in Campaign list 

@DeleteCampaign 
Scenario: Delete Campaign 
    #Given I log into the application
    And I move to "Plan" section
    And I should see newly created campaign in campaign list
    And I move to any of Campaign Tile 
    And I click on Three dots drodpown in Campaign Tile 
    Then I should see "Preview/Edit" & "Delete" Dropwdown Item
    And I click on "Delete" Dropwdown Item
    Then I should see Confirmation Prompt to Delete Campaign
    And I click on Cancel button 
    And I should see "Plan" screen
    And I click on Three dots drodpown in Campaign Tile 
    Then I should see "Preview/Edit" & "Delete" Dropwdown Item 
    And I click on "Delete" Dropwdown Item
    Then I should see Confirmation Prompt to Delete Campaign
    And I click on Delete button 
    Then I should see count of Campaign is decreased 

@ViewArticlesInAnalyzefromCampaign 
Scenario: View Articles In Analyze from Campaign Tile 
    #Given I log into the application
    And I move to "Plan" section
    And I should see newly created campaign in campaign list
    And I move to any of Campaign Tile 
    Then I should see "View Articles in Analyze" LinkText
    And I click on View Articles in Analyze LinkText
    Then I should see "Analyze Coverage" screen
    Then I should see "Article List" count 
    



