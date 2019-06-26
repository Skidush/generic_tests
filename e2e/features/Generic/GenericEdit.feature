@Regression @GenericCRUD
Feature: Edit an Item
    As a user
    I should be able to edit an item.

    @GenericEdit
    Scenario Outline: Edit an item
        Given I have an existing <itemType>
            And I am on <itemUrl>
        When I "edit" a/an <itemType> item
        Then I should "see" the details of the <itemType> in the table
        
    @SkillCRUD @SkillEdit
    Scenarios:
        | itemUrl          | itemType |
        | "/#/hmws/skills" | "Skill"  |

    @MachineCRUD @MachineEdit
    Scenarios:
        | itemUrl            | itemType    |
        | "/#/hmws/machines" | "Machine"  |

    @CompanyCRUD @CompanyEdit
    Scenarios:
        | itemUrl             | itemType     |
        | "/#/hmws/companies" | "Company"    |