package at.bestsolution;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import com.google.protobuf.ByteString;
import com.google.protobuf.CodedInputStream;
import com.google.protobuf.CodedOutputStream;
import com.google.protobuf.DynamicMessage;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.MessageLite;
import com.google.protobuf.Parser;
import com.google.protobuf.util.JsonFormat;

import at.bestsolution.msgprotobuf.Person;

public class Main {
	public static void main(String[] args) throws InvalidProtocolBufferException {
		// JsonFormat.Parser parser = JsonFormat.parser();
		// JsonFormat.Printer printer = JsonFormat.printer();
		// Person.Builder builder = Person.newBuilder();
		// var bos = new ByteArrayOutputStream();
		// var outstream = CodedOutputStream.newInstance(bos);

	}
}
