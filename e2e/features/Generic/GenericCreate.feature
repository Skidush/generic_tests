@Regression @GenericCRUD
Feature: Create an Item
    As a user
    I should be able to create an item.

    @GenericCreate
    Scenario Outline: Create a/an <itemType>
        Given I am on <itemUrl>
        When I "create" a/an <itemType> item
        Then I should see the "created" details of the <itemType>

    @SkillCRUD @SkillCreate
    Scenarios:
        | itemUrl          | itemType |
        | "/#/hmws/skills" | "Skill"  |

    @MachineCRUD @MachineCreate
    Scenarios:
        | itemUrl            | itemType  |
        | "/#/hmws/machines" | "Machine" |

    @CompanyCrud @CompanyCreate
    Scenarios:
        | itemUrl             | itemType  |
        | "/#/hmws/companies" | "Company" |