


export const globals = {


    required_condition: function(value: any) {
        return value != undefined && value != null;
    },
    field_is_required_by_default: true,
    apply_aliases: true,
    field_is_optional_by_default: false,
    skip_transform_on_default : true,
    skip_transform_on_optional_not_exists_no_default : true,


    error_generator: (f, d) => ({ 
        message: `Error - ${f.id} failed, on field : ${d.key}.`,
        id: f.id
    }),


    definition_id_generator: (idPrefix: string, definitionName: string) => (
        `${idPrefix}:${definitionName}`
    )
}