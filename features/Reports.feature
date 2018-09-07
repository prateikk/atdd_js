@Sanity @Reports
Feature: Validate UI and functionality on Reports Page

    Scenario: Move to Reports Menu
        Given "Report" is visible in the navigation menu
        And I click on "Report" navigation option
        And I am on "Report" screen

    Scenario: Create a new private Report
        Given I am on "Report" screen
        When I click on "New Report" button on report screen
        Then I see the page header as "New Report"
        When I click on "New Blank Report" button on report screen
        Then I should see 'Create a New Report' dialog
        And I set report name as "ACCEPTANCE REPORT"
        And I set profile as "Automation CampaignRP"
        And I set date range as "All"
        And I set the filter as "Private"
        When I click "CREATE REPORT" button on create new report screen
        Then I see the page header as "ACCEPTANCE REPORT" in the report
        Then I make the following validations
    * Title page is displayed
    * There are "2" report pages by default
    * Report title on the tile is "ACCEPTANCE REPORT"
    * Report duration is displayed on the title tile
    * I go to report page "1"
    * Page footer contains "Automation CampaignRP" campaign


    Scenario: Select Line chart as a component in the report
        When I go to report page "1"
        And I select "Charts" from report component options
        And I drag "Column" chart to the report
        Then "Column" chart is available in the report content

    Scenario: Add new page to the report
        And I click on "Add Page" button
        Then A page is added to the report

    Scenario: Add an article to the report
        When I go to report page "2"
        And I select "Articles" from report component options
        And I drag "Articles" chart to the report
        Then "Articles" chart is available in the report content

    Scenario: Add new page to the report
        And I click on "Add Page" button
        Then A page is added to the report

    Scenario: Add an Coverage tile to the report
        When I go to report page "3"
        And I select "Tiles" from report component options
        And I drag "Coverage" chart to the report
        Then "Coverage" chart is available in the report content


    Scenario: Make a report public from the reports list page
        Given "Report" is visible in the navigation menu
        And I click on "Report" navigation option
        And I am on "Report" screen
        When I open options dropdown for "ACCEPTANCE REPORT"
        And I click on "Edit Report" option
        Then 'Edit Report' pop-up is visible
        And I set the filter as "Public"
        Then I click on "Save Changes" button on edit report pop-up
        And I see that the "ACCEPTANCE REPORT" report is now "Public"
        And Information pop-up is visible and has text "The report has been updated successfully"

    Scenario: Create a C-Suite report
        Given "Report" is visible in the navigation menu
        And I click on "Report" navigation option
        And I am on "Report" screen
        When I click on "New Report" button on report screen
        Then I see the page header as "New Report"
        When I click on "Create" button of "C-Suite Report"
        Then I should see 'Create a New Report' dialog
        And I set report name as "C-Suite report"
        And I set profile as "Invisalign"
        And I set date range as "Last Month"
        And I set the filter as "Private"
        When I click "CREATE REPORT" button on create new report screen
        Then I see the page header as "C-SUITE REPORT"
        Then I make the following validations
* Title page is displayed
* Report title on the tile is "C-SUITE REPORT"
* Report duration is displayed on the title tile

    @monthlyReport
    Scenario: Create a Monthly report
        Given I click on "Back to reports" button
        And I am on "Report" screen
        When I click on "New Report" button on report screen
        Then I see the page header as "New Report"
        When I click on "Create" button of "Monthly Report"
        Then I should see 'Create a New Report' dialog
        And I set report name as "Monthly Report"
        And I set profile as "Invisalign"
        And I set date range as "Last Month"
        And I set the filter as "Private"
        When I click "CREATE REPORT" button on create new report screen
        Then I see the page header as "MONTHLY REPORT"
        Then I make the following validations
* Title page is displayed
* There are "24" report pages by default
* Report title on the tile is "MONTHLY REPORT"
* Report duration is displayed on the title tile


    @ShareReport
    Scenario: Share Report with Public Access
        Given I click on "Back to reports" button
        And I am on "Report" screen
        When I open the report named "Monthly Report"
        And Title page is displayed
        When I click on 'Download Report' icon
        Then I should see "Download Report" pop-up
        When I click on 'Share' tile
        Then I should see "Share Report" pop-up
        Then I check 'Make this report accessible' checkbox
        And I click on Preview it 'here' link
        Then I make the following validations
        * Title page is displayed
        * Report title on the tile is "MONTHLY REPORT"
        * Report duration is displayed on the title tile
        Then I close the pop-up

    @PreviewTemplate
    Scenario: Preview Templates from New Report screen
        Given "Report" is visible in the navigation menu
        And I click on "Report" navigation option
        And I am on "Report" screen
        When I click on "New Report" button on report screen
        Then I see the page header as "New Report"
        When I click on "Preview" button of "Monthly Report"
        Then I make the following validations
        * I should see "Monthly Report Preview" pop-up
        Then I close the pop-up

    @TestReportItemInEditMode
    Scenario: Edit Report Items
        Given "Report" is visible in the navigation menu
        And I click on "Report" navigation option
        And I am on "Report" screen
        When I open the report named "ACCEPTANCE REPORT"
        And I go to report page "1"
        When I select "Line Chart"
        And I click on "Chart Options" in Edit Mode
        And I set "Title" as "TESTTITLE"
        And I set "Horizontal Label" as "TestVTitle"
        And I set "Vertical Label" as "TestHTitle"
        Then I make the following validations
        * I should see "Title" as "TestVTitle" in Line Chart
        * I should see "Horizontal Label" as "TestHTitle" in Line Chart
        * I should see "Vertical Label" as "TestVTitle" in Line Chart
        When I go to report page "2"
        When I select "Article"
        And I click on "Article List Options" in Edit Mode
        And I check all the Matrics checkboxes
        Then Selected Matrics should be present in article
        When I go to report page "3"
        And I select "Coverage Tile"
        And I click on "Search and Filters" in Edit Mode
        And I click on keyword setting
        And I set "Publication name contains" as "Linkedin" in widget edit options
        Then I see amplification count from "Linkedin"


    Scenario: Search a report
        Given "Report" is visible in the navigation menu
        And I click on "Report" navigation option
        And I am on "Report" screen
        When I put "Acceptance Report" in the report search box
        Then I should see the report loaded matching "ACCEPTANCE REPORT"
        And I clear the report search box


    Scenario: Delete line chart widget from the report
        Given I am on "Report" screen
        When I open the report named "ACCEPTANCE REPORT"
        And I go to report page "1"
        And I set the widget size as "Large"
        And I select the widget to be deleted
        And I click on "OK" button on the pop-up
        Then The widget should be deleted


    Scenario: Clone a Report
        Given "Report" is visible in the navigation menu
        And I click on "Report" navigation option
        And I am on "Report" screen
        When I open options dropdown for "ACCEPTANCE REPORT"
        And I click on "Clone Report" option
        And Confirmation pop-up is visible and has text "Are you sure you want to make a copy of ACCEPTANCE REPORT"
        And I click on "OK" button on the pop-up
        Then 'Edit Report' pop-up is visible
        And I click on "Save Changes" button on edit report pop-up
        And I am on "Report" screen
    # And New report with name "Copy of Acceptance Report" is added


    Scenario: Destroy a report
        Given "Report" is visible in the navigation menu
        And I click on "Report" navigation option
        And I am on "Report" screen
        When I open options dropdown for "ACCEPTANCE REPORT"
        And I click on "Destroy Report" option
        Then Confirmation pop-up is visible and has text "Are you sure you want to delete"
        Then Confirmation pop-up is visible and has text "COPY OF ACCEPTANCE REPORT"
        And I click on "Delete" button on the pop-up
        And "Copy of Acceptance Report" is deleted from the reports dashboard
        When I am on "Report" screen
        And I open options dropdown for "ACCEPTANCE REPORT"
        And I click on "Destroy Report" option
        Then Confirmation pop-up is visible and has text "Are you sure you want to delete"
        Then Confirmation pop-up is visible and has text "ACCEPTANCE REPORT"
        And I click on "Delete" button on the pop-up
        And "ACCEPTANCE REPORT" is deleted from the reports dashboard
        When I am on "Report" screen
        And I open options dropdown for "Monthly Report"
        And I click on "Destroy Report" option
        Then Confirmation pop-up is visible and has text "Are you sure you want to delete"
        Then Confirmation pop-up is visible and has text "MONTHLY REPORT"
        And I click on "Delete" button on the pop-up
        And "MONTHLY REPORT" is deleted from the reports dashboard
        When I am on "Report" screen
        And I open options dropdown for "C-Suite report"
        And I click on "Destroy Report" option
        Then Confirmation pop-up is visible and has text "Are you sure you want to delete"
        Then Confirmation pop-up is visible and has text "C-SUITE REPORT"
        And I click on "Delete" button on the pop-up
        And "C-SUITE REPORT" is deleted from the reports dashboard

Scenario: Move to Plan Screen
        Given "Plan" is visible in the navigation menu
        And I click on "Plan" navigation option
        And I am on "Plan" screen

Scenario: Delete Plan Campaign
    And  I should see "Search Campaigns" input box
    When I set "Search Campaigns" as "Automation CampaignRP" on Plan "Campaign" page
    Then I should see "Campaing" named "Automation CampaignRP" on Plan "Campaign" page
    And I click on option menu
    And I click on "Delete" Dropdown item
    Then I should see Confirmation Prompt to "Delete Campaign"
    And I click on "Delete" button
    And I set "Search Campaigns" as "Automation CampaignRP" on Plan "Campaign" page
    Then I should see count of Campaign is decreased

#@allUsers
# Scenario: Verify reports from All Reports & My Reports
# Given I log into the application
#     Given "Report" is visible in the navigation menu
#     And I click on "Report" navigation option
#     And I am on "Report" screen
#     Then I see "All Reports" by default
#     And I see reports created by me and other users
#     When I click on "My Reports"
#     Then I should see the reports created by me only
