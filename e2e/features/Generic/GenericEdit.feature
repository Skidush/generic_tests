@Regression @GenericCRUD
Feature: Edit an Item
    As a user
    I should be able to edit an item.

    @GenericEdit
    Scenario Outline: Edit an item
        Given I have an existing <itemType>
            And I am on the item list of <itemTypes>
        When I "create" an <itemType> item
        Then I should see the "edited" details of <itemType>

    @SkillsCRUD @SkillEdit
    Scenarios:
        | url              | itemType | itemTypes |
        | "/#/hmws/skills" | "Skill"  | "Skills"  |