@Regression @GenericCRUD
Feature: Create an Item
    As a user
    I should be able to create an item.

    @GenericCreate
    Scenario Outline: Create a/an <itemType>
        Given I am on <url>
        When I "create" a/an <itemType> item
        Then I should see the "created" details of the <itemType>

    @SkillCRUD @SkillCreate
    Scenarios:
        | url              | itemType |
        | "/#/hmws/skills" | "Skill"  |

    @MachineCRUD @MachineCreate
    Scenarios:
        | url                | itemType  |
        | "/#/hmws/machines" | "Machine" |

    @CompanyCrud @CompanyCreate
    Scenarios:
        | url                 | itemType  |
        | "/#/hmws/companies" | "Company" |