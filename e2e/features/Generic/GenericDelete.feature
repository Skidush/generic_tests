@Regression @GenericCRUD
Feature: Delete an Item
    As a user
    I should be able to delete an item.

    @GenericDelete
    Scenario Outline: Delete an item
        Given I have an existing <itemType>
            And I am on the item list of <itemTypes>
        When I <action> a <itemType> item
        Then the <itemType> should be deleted

    @SkillsCRUD @SkillDelete
    Scenarios:
        | url              | itemType | itemTypes |
        | "/#/hmws/skills" | "Skill"  | "Skills"  |