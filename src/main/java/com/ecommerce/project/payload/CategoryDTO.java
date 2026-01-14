package com.ecommerce.project.payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    @Schema(description = "Add category id",example = "101")
    private Long categoryId;
    @Schema(description = "Add Category Name",example = "virat kohli Bat")
    private String categoryName;
}
