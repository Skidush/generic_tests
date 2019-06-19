@GenericRead
Feature: Read an Item
    As a user
    I should be able to view and read the details of an item.

    @GenericReadFromTable
    Scenario: Read item details from the table
        Given I have an existing "Company"
            And I am on "/#/hmws/companies"
        When The "Companies" table loads
        Then I should "see" the details of the "Companies" in the table

    # @GenericReadFromTable
    # Scenario Outline: Read an item from the table
    #     Given I am on <url>
    #         And I have an existing <itemType>
    #     When the <itemType> list loads
    #     Then I should see the table with data

    # @SkillsCRUD @ReadSkillsFromTable
    # Scenarios:
    #     | url                 | itemType    |
    #     | "/#/hmws/skills"    | "Skill"     |


    # @GenericReadFromDetails
    # Scenario Outline: Read an item from the details page
    #     Given I have an existing <itemType>
    #         And I am on the item list of <itemTypes>
    #     When I navigate to see the details of <itemType>
    #     Then I should see the details of <itemType>


    # @SkillsCRUD @ReadSkillsFromDetails
    # Scenarios:
    #     | url                 | itemType    | itemTypes    |
    #     | "/#/hmws/skills"    | "Skill"     | "Skills"     |