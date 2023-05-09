using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proba1Adriana.Migrations
{
    /// <inheritdoc />
    public partial class V7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cena",
                table: "Rezervacija");

            migrationBuilder.AddColumn<int>(
                name: "Cena",
                table: "Predstava",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cena",
                table: "Predstava");

            migrationBuilder.AddColumn<int>(
                name: "Cena",
                table: "Rezervacija",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
