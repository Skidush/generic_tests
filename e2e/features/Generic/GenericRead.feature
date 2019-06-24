@GenericRead
Feature: Read an Item
    As a user
    I should be able to view and read the details of an item.
    
    @GenericReadFromTable
    Scenario Outline: Read <itemType> details from the table
        Given I have an existing <itemType>
            And I am on <itemUrl>
        When The <itemType> table has loaded
        Then I should <view> the details of the <itemTypePlural> in the table

    @CompaniesCRUD @ReadCompaniesFromTable
    Scenarios:
        | itemType  | itemUrl              | view  | itemTypePlural |
        | "Company" | "/#/hmws/companies"  | "see" | "Companies"    |

    @GenericReadFromDetails
    Scenario Outline: Read <itemType> from the details page
        Given I have an existing <itemType>
        When I navigate to a/an <itemType> details page
        Then I should see the <action> details of <itemType>

    @CompaniesCRUD @ReadCompaniesFromDetails
    Scenarios:
        | itemType  | itemUrl              | action       |
        | "Company" | "/#/hmws/companies"  | "selected"   |
