package dev.rsdlang.sample.client;

public record DayOfWeek(String value) {
    public static final DayOfWeek MONDAY = new DayOfWeek("MONDAY");
    public static final DayOfWeek TUESDAY = new DayOfWeek("TUESDAY");
    public static final DayOfWeek WEDNESDAY = new DayOfWeek("WEDNESDAY");
    public static final DayOfWeek THURSDAY = new DayOfWeek("THURSDAY");
    public static final DayOfWeek FRIDAY = new DayOfWeek("FRIDAY");
    public static final DayOfWeek SATURDAY = new DayOfWeek("SATURDAY");
    public static final DayOfWeek SUNDAY = new DayOfWeek("SUNDAY");

    public static DayOfWeek parse(String s) {
        return new DayOfWeek(s);
    }

    public static String toString(DayOfWeek value) {
        return value.value();
    }
}
