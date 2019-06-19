@Regression @GenericCRUD
Feature: Create an Item
    As a user
    I should be able to create an item.

    @Create
    Scenario Outline: Create an item
        Given I am on <url>
        When I "create" a <itemType> item
        Then I should see the "created" details of <itemType>

    @SkillsCRUD @SkillCreate
    Scenarios:
        | url              | itemType |
        | "/#/hmws/skills" | "Skill"  |