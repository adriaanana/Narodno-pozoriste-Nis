using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proba1Adriana.Migrations
{
    /// <inheritdoc />
    public partial class V4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Vreme",
                table: "Predstava");

            migrationBuilder.AlterColumn<string>(
                name: "Slika",
                table: "Predstava",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Slika",
                table: "Predstava",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Vreme",
                table: "Predstava",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
