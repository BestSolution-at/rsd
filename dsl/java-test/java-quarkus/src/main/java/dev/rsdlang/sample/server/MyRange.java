package dev.rsdlang.sample.server;

public class MyRange {
    public static MyRange of(String s) {
        String[] parts = s.substring(1, s.length() - 1).split(",");
        return new MyRange(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]));
    }

    private final int start;
    private final int end;

    public MyRange(int start, int end) {
        this.start = start;
        this.end = end;
    }

    public int getStart() {
        return start;
    }

    public int getEnd() {
        return end;
    }

    @Override
    public String toString() {
        return "[" + start + "," + end + "]";
    }
}
